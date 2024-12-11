import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import dayjs from 'dayjs';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import {useAppContext} from '../../App';
import DataAPI from '../../API/DataAPI';
import {usePatientContext} from '../PatientContext';
import {useAppointmentContext} from './AppointmentContext';
import SubmissionModal from '../../components/SubmissionModal';
import DoctorSelectForm from '../../components/DoctorSelectForm';
import DateTimeForm from '../../components/DateTimeForm';

const EditAppointment = () => {

	const {index} = useParams();
	const {navigate} = useAppContext();
	const {patientInfo} = usePatientContext();
	const {
		appointments: patientAppointments,
		setAppointments: setPatientAppointments
	} = useAppointmentContext();
	const [appointment] = useState(patientAppointments[index]);
	const [specializations, setSpecializations] = useState([]);
	const [doctors, setDoctors] = useState([]);
	const [doctorAppointments, setDoctorAppointments] = useState([]);
	const [now] = useState(dayjs());
	const [nineAM] = useState(now.set('hour', 9).startOf('hour'));
	const [fourPM] = useState(now.set('hour', 16).startOf('hour'));
	const [minDate, setMinDate] = useState(now);
	const [minTime, setMinTime] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [form, setForm] = useState({
		specialization: {
			id: appointment.doctor.specialization.id,
			name: appointment.doctor.specialization.name,
		},
		doctor: {
			id: appointment.doctor.id,
			firstName: appointment.doctor.firstName,
			lastName: appointment.doctor.lastName,
		},
		fullName: appointment.doctor.firstName + " " + appointment.doctor.lastName,
		date: null,
		time: null,
		visitType: null,
		valid: false,
	});

	useEffect(() => {
		if (patientInfo.email === '')
			navigate("/");
		(async () => {
			const specs = await DataAPI.request("specializations", "GET");
			if (specs != null)
				setSpecializations(JSON.parse(specs));
			if (form.specialization.id != null) {
				const docs = await DataAPI.request("doctors/specialization", "GET", {
					specializationId: form.specialization.id
				});
				setDoctors(JSON.parse(docs));
			}
		})();
	}, [patientInfo.email, form.specialization, navigate]);

	useEffect(() => {
		if (form.doctor.id !== null) {
			(async () => {
				const docAppointments = await DataAPI.request(
					"appointments/doctors", "GET",
					{doctorId: form.doctor.id}
				);
				if (docAppointments !== null)
					setDoctorAppointments(docAppointments);
			})();
		} else {
			setDoctorAppointments([]);
		}
	}, [form.doctor.id]);

	useEffect(() => {
		if (now.isBefore(nineAM) || (form.date != null && now.isBefore(form.date))) {
			setMinTime(nineAM);
		} else {
			let time = now.add(1, 'hour').hour();
			time = now.set('hour', time).startOf('hour');
			if (now.isBetween(fourPM, nineAM.add(1, 'day'))) {
				setMinTime(nineAM);
				setMinDate(dayjs().add(1, 'day'));
			} else {
				setMinTime(time);
			}
		}
	}, [form.date, fourPM, nineAM, now]);

	//id, value, field
	const handleChange = (value, field, id) => {
		if (field !== "specialization" &&
				field !== "doctor" &&
				field !== "date" &&
				field !== "time" &&
				field !== "visitType") {
			console.log("Error: not a valid object field");
			console.log(value, field, id);
			return;
		}

		let obj = null;
		if (field === "specialization" || field === "doctor") {
			const fieldIndex = parseInt(id.charAt(id.length - 1));
			if (id !== "" && !isNaN(fieldIndex)) {
				if (field === "specialization") {
					obj = {...specializations[fieldIndex]};
				} else if (field === "doctor") {
					obj = {...doctors[fieldIndex]};
				}
			} else {
				obj = null;
			}
		}

		let temp = {
			doctor: (field === "doctor" ?
				(obj !== null ? obj : {
					id: null,
					firstName: '',
					lastName: '',
				}) : (field === "specialization" ? {
					id: null,
					firstName: '',
					lastName: '',
				} : form.doctor)
			),

			specialization: (field === "specialization" ?
				(obj !== null ? obj : {
					id: null,
					name: '',
				}) : form.specialization),

			fullName: (field === "doctor" ? value :
				(field === "specialization" ? '' :
					form.fullName)),

			date: (field === "date" ? value :
				(field === "specialization" || field === "doctor" ? null :
					form.date)),

			time: (field !== "time" && field !== "visitType" ? null :
				(field === "time" ? value :
					form.time)),

			visitType: (field === "visitType" ? value :
				form.visitType),
		}

		temp.valid =
			value !== null &&
			temp.doctor.id !== null &&
			temp.specialization.id !== null &&
			temp.date !== null &&
			temp.time !== null &&
			temp.visitType !== null;

		setForm(temp);
	}

  const confirmSubmit = async () => {
  	console.log(form);
  	let dateTime = dayjs(form.date).add(dayjs(form.time).get('hour'), 'hour');
  	dateTime = dayjs(dateTime).add(dayjs(form.time).get('minute'), 'minute');
  	let updatedAppointment = {
  		id: appointment.id,
  		dateTime: dateTime,
  		doctor: {
  			...form.doctor,
  			specialization: {
  				...form.specialization,
  			},
  		},
  		visitType: form.visitType,
  		status: (dayjs(dateTime) !== dayjs(appointment.dateTime) ?
  			'RESCHEDULED' : 'CONFIRMED'),
  	}
  	await DataAPI.request(
  		"appointments/update", "PUT",
  		{"content-type": "application/json"},
  		JSON.stringify(updatedAppointment));

  	patientAppointments[index] = updatedAppointment;
  	setPatientAppointments(patientAppointments);
  	setModalOpen(false);
		navigate("/myappointments/list");
  }


	const filterDates = (date) => {
		let day = date.day();
		if (day === 0 || day === 6 || form.doctor.id === null)
			return true;

		date = date.format("YYYY-MM-DD");
		if (patientAppointments != null) {
			for (let i = 0;i < patientAppointments.length;i++) {
				if (i == index)
					continue;
				let apptDate = dayjs(patientAppointments[i].dateTime).format("YYYY-MM-DD");
				if (date === apptDate &&
					patientAppointments[i].status !== "CANCELLED" &&
					patientAppointments[i].doctor.id === form.doctor.id)
					return true;
			}
		}
		return false;
	}

	return (
		<Container sx={{mt: 8}}>
			<Paper elevation={5} sx={{p: 4}}>
				<Grid container spacing={4} >
					<Grid item xs={12}>
						<DoctorSelectForm
							form={form}
							specializations={specializations}
							doctors={doctors}
							handleChange={handleChange}
						/>
					</Grid>

					<Grid item xs={12}>
						<DateTimeForm
							form={form}
							patientAppointments={patientAppointments}
							doctorId={form.doctor.id}
							doctorAppointments={doctorAppointments}
							minDate={minDate}
							minTime={minTime}
							maxTime={fourPM}
							handleChange={handleChange}
							filterDates={filterDates}
						/>
					</Grid>
				</Grid>
			</Paper>
			<SubmissionModal
				open={modalOpen}
				setOpen={setModalOpen}
				cancel={() => setModalOpen(false)}
				confirmSubmit={confirmSubmit}
				form={{
					...form,
					patient: null,
				}}
			/>
			<Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}} >
				<Button
					onClick={() => navigate("/myappointments/list")}
					variant="contained">
					CANCEL
				</Button>
				<Button
					onClick={() => setModalOpen(true)}
					variant="contained"
					disabled={!form.valid}>
					SAVE
				</Button>
			</Box>
		</Container>
	);

}

export default EditAppointment;