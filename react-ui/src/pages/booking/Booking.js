import {useState, useEffect} from 'react';

import dayjs from 'dayjs';

import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import DataAPI from '../../API/DataAPI';
import {useAppContext} from '../../App';
import {usePatientContext} from '../PatientContext';
import PatientInfo from './PatientInfo';
import DoctorSelect from './DoctorSelect';
import DateSelect from './DateSelect';
import SubmissionModal from '../../components/SubmissionModal';

const Booking = () => {

	const {navigate} = useAppContext();
	const {patientInfo, setPatientInfo} = usePatientContext();
	const [modalOpen, setModalOpen] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [patientForm, setPatientForm] = useState({
		firstName: {
			value: patientInfo.firstName,
			error: false,
		},
		lastName: {
			value: patientInfo.lastName,
			error: false,
		},
		email: {
			value: patientInfo.email,
			error: false,
		},
		dob: {
			value: patientInfo.dob,
			error: false,
		},
		valid:
			patientInfo.firstName !== '' &&
			patientInfo.lastName !== '' &&
			patientInfo.email !== '' &&
			patientInfo.dob !== null,
	});
	const [doctorForm, setDoctorForm] = useState({
		doctor: {
			id: null,
			firstName: '',
			lastName: '',
		},
		specialization: {
			id: null,
			name: '',
		},
		fullName: '',
		valid: false,
	});
	const [dateForm, setDateForm] = useState({
		date: null,
		time: null,
		visitType: "",
		valid: false,
	});

	//deselect date/time when user changes doctor
	useEffect(() => {
		setDateForm({
			date: null,
			time: null,
			visitType: null,
			valid: false,
		})
	}, [doctorForm]);

	const handlePrevious = () => {
		setActiveStep(activeStep - 1);
	}

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	}

	const handleSubmit = () => {
		setModalOpen(true);
	}

	const confirmSubmit = async () => {
		const appointment = {
			patient: {
				firstName: patientForm.firstName.value,
				lastName: patientForm.lastName.value,
				dob: patientForm.dob.value,
				email: patientForm.email.value,
			},
			doctor: {
				...doctorForm.doctor,
				specialization: doctorForm.specialization,
			},
			dateTime: dayjs(`${dateForm.date.format("YYYY-MM-DD")} ${dateForm.time.format("HH:mm")}`),
			visitType: dateForm.visitType,
		};

		setPatientInfo(appointment.patient);

		console.log(appointment);

		const response = await DataAPI.request(
				"appointments/new", "POST",
				{"content-type": "application/json"},
				JSON.stringify(appointment)
		);

		console.log(response);

		if (response !== null) {
			setModalOpen(false);
			navigate("/");
		}
	}

	const forms = [patientForm, doctorForm, dateForm];
	const stepNames = ["Patient Information", "Choose a doctor", "Select a date"];
	const steps = [
		<PatientInfo
			form={patientForm}
			setForm={setPatientForm}
		/>,
		<DoctorSelect
			form={doctorForm}
			setForm={setDoctorForm}
		/>,
		<DateSelect
			form={dateForm}
			setForm={setDateForm}
			patientEmail={patientForm.email.value}
			doctorId={doctorForm.doctor.id}
		/>,
	];

	return (
		<Container>
			<Stepper activeStep={activeStep} sx={{mt: 2}}>
				{stepNames.map((label, index) => {
					return (
						<Step key={index}>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>

			<Box sx={{mt: 4}}>
				{steps[activeStep]}
			</Box>

			<Box sx={{mt: 4, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
				<Button
					variant="contained"
					disabled={activeStep === 0}
					onClick={handlePrevious} >
					previous
				</Button>
				<Button
					variant="contained"
					disabled={!forms[activeStep].valid}
					onClick={stepNames[activeStep] === "Select a date" ?
						handleSubmit : handleNext} >
					{stepNames[activeStep] === "Select a date" ?
						"submit" : "next step"}
				</Button>
			</Box>
				<SubmissionModal
					open={modalOpen}
					setOpen={setModalOpen}
					cancel={() => setModalOpen(false)}
					confirmSubmit={confirmSubmit}
					form={{
						patient: {
							firstName: patientForm.firstName.value,
							lastName: patientForm.lastName.value,
							dob: patientForm.dob.value,
							email: patientForm.email.value,
						},
						...doctorForm,
						...dateForm,
					}}
				/>

		</Container>
	);

}

export default Booking;