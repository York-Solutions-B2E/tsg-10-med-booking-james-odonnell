import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import dayjs from 'dayjs';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {useAppContext} from '../../App';
import DataAPI from '../../API/DataAPI';
import {usePatientContext} from '../PatientContext';
import {useAppointmentContext} from './AppointmentContext';
import EditForm from './components/EditForm';
import SubmissionModal from '../../components/SubmissionModal';

const EditAppointment = () => {

	const {index} = useParams();
	const {navigate} = useAppContext();
	const {patientInfo} = usePatientContext();
	const {appointments, setAppointments} = useAppointmentContext();
	const [modalOpen, setModalOpen] = useState(false);
	const [specializations, setSpecializations] = useState([]);
	const [appointment] = useState(appointments[index]);
	const [doctors, setDoctors] = useState([]);
	const [now] = useState(dayjs());
	const [nineAM] = useState(now.set('hour', 9).startOf('hour'));
	const [fourPM] = useState(now.set('hour', 16).startOf('hour'));
	const [minDate, setMinDate] = useState(now);
	const [minTime, setMinTime] = useState(null);
	const [valid, setValid] = useState(true);
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
	});

	useEffect(() => {
		if (patientInfo.email === '')
			navigate("/");
		(async () => {
			const data = await DataAPI.get("specializations");
			if (data != null)
				setSpecializations(data);
			if (form.specialization.id != null) {
				const data = await DataAPI.get("doctors/specialization", {
					specializationId: form.specialization.id
				});
				setDoctors(data);
			}
		})();
	}, [patientInfo.email, form.specialization, navigate]);

	useEffect(() => {
		if (dayjs().isBefore(nineAM) || (form.date != null && dayjs().isBefore(form.date))) {
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

	useEffect(() => {
		console.log(form);
		setValid(
			form.specialization.id !== null &&
			form.doctor.id !== null &&
			form.date !== null &&
			form.time !== null &&
			form.visitType !== null
		);
	}, [form]);

	const handleChange = (value, type, e) => {
		let field = null;
		if (value === null)
			setValid(false);
		console.log(value, type, e);
		if (type === "doctor" || type === "specialization") {
			const {id} = e.target;
			const fieldIndex = parseInt(id.charAt(id.length - 1));
			if (isNaN(fieldIndex)) {
				setValid(false);
				setForm({
					...form,
					specialization:
						(type === "specialization" ? value !== null ?
							value : {
								id: null,
								name: ''
							} : form["specialization"]
						),
					doctor: {
						id: null,
						firstName: '',
						lastName: '',
					},
					date: null,
					time: null,
					fullName: ''
				});
				return;
			}
			type === "doctor" ?
				field = {...doctors[fieldIndex]} :
				field = {...specializations[fieldIndex]};
		}
		setForm({
			...form,
			doctor: (type === "doctor" && field !== null ?
				{...field} : type === "specialization" ? {
					id: null,
					firstName: '',
					lastName: ''
				} : form.doctor
			),
			date: (type === "doctor" || type === "specialization" ?
				null : form.date),
			time: (type === "doctor" || type === "specialization" || type === "date" ?
				null : form.time),
			[type]: (type === "doctor" || type === "specialization" ?
				{...field} : value),
			fullName: (type === "doctor" ?
				value : type === "specialization" ?
				'' : form.fullName
			)
		});
	}

	const appointmentConflicts = (date) => {
    let day = date.day();
    if (day === 0 || day === 6 || form.doctor.id === null)
      return true;

    if (appointments != null) {
      for (let i = 0;i < appointments.length;i++) {
      	if (i == index)
      		continue;
        let apptDate = dayjs(appointments[i].dateTime).get('date');
        if (date.get('date') === apptDate && appointments[i].doctor.id === form.doctor.id)
          return true;
      }
    }
    return false;
  }

  const confirmSubmit = async () => {
  	console.log(form);
  	let dateTime = dayjs(form.date).add(dayjs(form.time).get('hour'), 'hour');
  	dateTime = dayjs(dateTime).add(dayjs(form.time).get('minute'), 'minute');
  	let updatedAppointment = {
  		id: appointment.id,
  		dateTime: dateTime,
  		doctor: {
  			...form["doctor"],
  			specialization: {
  				...form["specialization"]
  			}
  		},
  		visitType: form.visitType,
  		status: (dayjs(dateTime) !== dayjs(appointment.dateTime) ?
  			'RESCHEDULED' : 'CONFIRMED')
  	}
  	await DataAPI.put(
  		"appointments/update",
  		{"content-type": "application/json"},
  		JSON.stringify(updatedAppointment));

  	appointments[index] = updatedAppointment;
  	setAppointments(appointments);
  	setModalOpen(false);
		navigate("/myappointments/list");
  }

	return (
		<Container sx={{mt: 8}}>
			<EditForm props={{
				specializations,
				doctors,
				minDate,
				minTime,
				form,
				handleChange,
				appointmentConflicts}}
			/>
			<SubmissionModal
				open={modalOpen}
				setOpen={setModalOpen}
				cancel={() => setModalOpen(false)}
				confirmSubmit={confirmSubmit}
				form={{form}}
				patient={null}
				doctor={{
					...form["doctor"],
					specialization: form.specialization
				}}
				specialization={form.specialization}
				appointment={{
					visitType: form.visitType
				}}
			/>
			<Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}} >
				<Button
					onClick={() => navigate("/myappointments/list")}
					variant="contained">
					CANCEL</Button>
				<Button
					onClick={() => setModalOpen(true)}
					variant="contained"
					disabled={!valid}>
					SAVE
				</Button>
			</Box>
		</Container>
	);

}

export default EditAppointment;