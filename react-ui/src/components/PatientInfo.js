import {useState} from 'react';

import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import {useBookingContext} from '../pages/Booking';

const PatientInfo = () => {

	const [fNValid, setFNValid] = useState(true);
	const [lNValid, setLNValid] = useState(true);

	const {patient} = useBookingContext();

	const validateName = (e) => {
		const value = e.target.value;
		if (value === '')
			return false;
		const reg = new RegExp("[a-z|A-Z|'|-]");
		for (let i = 0;i < value.length;i++) {
			if (!reg.test(value.charAt(i)))
				return false;
		}
		return true;
	}

	return (
		<Paper component="form" elevation={5} sx={{padding: 4}}>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
				<TextField
					id="firstName"
					label="First name"
					required
					error={!fNValid}
					defaultValue={patient.firstName}
					onChange={(e) => patient.firstName = e.target.value}
					onBlur={(e) => setFNValid(validateName(e))}
					sx={{width: '30%'}}
				/>
				<TextField
					id="lastName"
					label="Last name"
					required
					error={!lNValid}
					defaultValue={patient.lastName}
					onChange={(e) => patient.lastName = e.target.value}
					onBlur={(e) => setLNValid(validateName(e))}
					sx={{ml: 4, width: '40%'}}
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="Date of birth *"
						required
						disableFuture
						minDate={dayjs("1900-01-01")}
						defaultValue={dayjs(patient.dob)}
						onChange={(date) => patient.dob = date}
						sx={{ml: 4}}
					/>
				</LocalizationProvider>
			</Box>

			<TextField
				id="email"
				label="Email"
				required
				sx={{mt: 4, width: '100%'}}
			/>

			<Stack direction="row" sx={{width: '100%'}}>

				<Stack sx={{mt: 4, width: '70%'}}>
					<TextField
						disabled
						id="address1"
						label="Address 1"
						required
						sx={{mb: 4}}
					/>
					<TextField
						disabled
						id="address2"
						label="Address 2"
					/>
				</Stack>

				<Stack sx={{mt: 4, ml: 4, width: '45%'}}>
						<TextField
							disabled
							id="city"
							label="City"
							required
						/>
					<Stack direction="row" sx={{mt: 4}}>
						<TextField
							disabled
							id="state"
							label="State"
							required
						/>
						<TextField
							disabled
							id="zipCode"
							label="Zip Code"
							sx={{ml: 4}}
							required
						/>
					</Stack>
				</Stack>
			
			</Stack>
			<Box sx={{mt: 4}}>
				<TextField
					disabled
					id="symptoms"
					label="Symptoms"
					sx={{width: '100%'}}
					multiline
					rows={4}
				/>
			</Box>
		</Paper>
	);

}

export default PatientInfo;