import {useState} from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Booking = () => {

	const steps = ["Patient Information", "Choose a doctor", "Select a date", "Review"];
	const [activeStep, setActiveStep] = useState(0);

	return (
		<Container sx={{mt: 4}}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					return (
						<Step>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</Container>
	);
}

export default Booking;
