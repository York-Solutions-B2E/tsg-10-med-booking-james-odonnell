import {useState, useEffect} from 'react';

import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import {useAppContext} from '../../App';
import {usePatientContext} from '../PatientContext';
import PatientInfo from './components/PatientInfo';
import DoctorSelect from './components/DoctorSelect';
import DateSelect from './components/DateSelect';

const Booking = () => {

	const {navigate} = useAppContext();
	const {patientInfo, setPatientInfo} = usePatientContext();
	const [modalOpen, setModalOpen] = useState();
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
		valid: false,
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
		visitType: null,
		valid: false,
	});

	const handlePrevious = () => {
		setActiveStep(activeStep - 1);
	}

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	}

	const forms = [patientForm, doctorForm, dateForm];
	const stepNames = ["Patient Information", "Choose a doctor", "Select a date"];
	const steps = [
		<PatientInfo form={patientForm} setForm={setPatientForm} />,
		<DoctorSelect form={doctorForm} setForm={setDoctorForm} />,
		<DateSelect form={dateForm} setForm={setDateForm} />,
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
					onClick={handleNext} >
					{stepNames[activeStep] === "Select a date" ?
						"submit" : "next step"}
				</Button>
			</Box>
{/*				<SubmissionModal
					open={modalOpen}
					setOpen={setModalOpen}
					cancel={() => setModalOpen(false)}
					confirmSubmit={confirmSubmit}
					form={{
						date: dayjs(appointment.dateTime),
						time: dayjs(appointment.dateTime)
					}}
					patient={patient}
					doctor={doctor}
					specialization={doctor.specialization}
					appointment={appointment}
				/>*/}

		</Container>
	);

}

export default Booking;