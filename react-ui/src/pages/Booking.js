import {useState, createContext, useContext} from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import PatientInfo from '../components/PatientInfo';
import DoctorSelect from '../components/DoctorSelect';
import DateSelect from '../components/DateSelect';

const BookingContext = createContext();
export const useBookingContext = () => {
	return useContext(BookingContext);
}

const Booking = () => {

	const stepNames = ["Patient Information", "Choose a doctor", "Select a date"];
	const steps = [<PatientInfo />, <DoctorSelect />, <DateSelect />];
	const [activeStep, setActiveStep] = useState(0);
	const [patient] = useState({
		firstName: '',
		lastName: '',
		dob: null,
		email: ''
	});
	const [doctor] = useState({
		id: null,
		firstName: '',
		lastName: '',
		specialization: {
			id: null,
			name: ''
		}
	});
	const [appointment] = useState({
		dateTime: new Date(),
		doctor: null,
		patient: null,
		status: null,
		isInPerson: null
	});
	const [valid, setValid] = useState([false, false, false]);

	const handlePrevious = () => {
		setActiveStep(activeStep - 1)
	}

	const handleNext = () => {
		activeStep < steps.length - 1 ?
		setActiveStep(activeStep + 1) :
		handleSubmit();
	}

	const handleSubmit = () => {
	}

	return (
		<Container sx={{mt: 4}}>
			<Stepper activeStep={activeStep}>
				{stepNames.map((label, index) => {
					return (
						<Step key={index}>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>

			<BookingContext.Provider value={{patient, doctor, appointment, handlePrevious, handleNext}}>
				<Box sx={{mt: 4}}>
					{steps[activeStep]}
				</Box>
			</BookingContext.Provider>
			
		</Container>
	);
}

export default Booking;
