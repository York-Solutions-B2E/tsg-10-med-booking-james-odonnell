import {useState, createContext, useContext} from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import PatientInfo from '../components/PatientInfo';
import DoctorSelect from '../components/DoctorSelect';

const BookingContext = createContext();
export const useBookingContext = () => {
	return useContext(BookingContext);
}

const Booking = () => {

	const stepNames = ["Patient Information", "Choose a doctor", "Select a date", "Review"];
	const steps = [<PatientInfo />, <DoctorSelect />, null, null];
	const [activeStep, setActiveStep] = useState(0);
	const [patient] = useState({firstName: '', lastName: '', dob: new Date()});
	const [doctor] = useState({firstName: '', lastName: '', specialization: -1});

	const handleSubmit = () => {
		if (patient.firstName === '' || patient.lastName === '') {
			return;
		}
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

			<BookingContext.Provider value={{patient, doctor}}>
				<Box sx={{mt: 4}}>
					{steps[activeStep]}
				</Box>
			</BookingContext.Provider>
			
			<Box sx={{mt: 4, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
				<Button
					variant="contained"
					disabled={activeStep === 0}
					onClick={() => setActiveStep(activeStep - 1)}>
					Previous
				</Button>
				<Button
					variant="contained"
					disabled={activeStep === steps.length - 1}
					onClick={() => {
						activeStep < steps.length - 1 ?
							setActiveStep(activeStep + 1) :
							handleSubmit();
						}}>
					{activeStep === steps.length - 1 ? "Finish" : "Next Step"}
				</Button>
			</Box>
			
		</Container>
	);
}

export default Booking;
