import {useState, useEffect} from 'react';

import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import {useBookingContext} from '../pages/Booking';

const PatientInfo = () => {

	const {patient, handleNext} = useBookingContext();
	const [valid, setValid] = useState(false);
	const [form, setForm] = useState({
		firstName: {value: patient.firstName, error: false},
		lastName: {value: patient.lastName, error: false},
		dob: {value: patient.dob, error: false},
		email: {value: patient.email, error: false}
	});

	useEffect(() => {
		setValid(
			!form.firstName.error && !form.lastName.error && !form.email.error &&
			form.firstName.value !== '' && form.lastName.value !== '' && form.email.value !== '');
	}, [form])

	const validateName = (value) => {
		if (value === '')
			return false;
		const reg = new RegExp("[a-z|A-Z|'|-]");
		for (let i = 0;i < value.length;i++) {
			if (!reg.test(value.charAt(i)))
				return false;
		}
		return true;
	}

	const validateEmail = (value) => {
		if (value === '')
			return false;
		let at = false;
		const reg = new RegExp("[a-z|A-Z|0-9|+|.|']");
		for (let i = 0;i < value.length;i++) {
			if (value.charAt(i) === '@') {
				if (at || i === 0)
					return false;
				at = true;
				continue;
			}
			if (!reg.test(value.charAt(i)))
				return false;
		}
		if (!at || value.charAt(value.length - 1) === '@')
			return false;
		return true;
	}

	const handleChange = (e) => {
		const {name, value} = e.target;
		let error = false;
		if (name === "firstName" || name === "lastName")
			error = !validateName(value);
		else if (name === "email")
			error = !validateEmail(value);
		if (error)
			setValid(false);
		setForm({
			...form,
			[name]:{
				...form[name],
				value,
				error
			}
		});
	}

	return (
		<>
			<Paper component="form" elevation={5} sx={{padding: 4}}>
				<Box sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
					<TextField
						name="firstName"
						label="First name"
						required
						placeholder={patient.firstName}
						value={form.firstName.value}
						error={form.firstName.error}
						onChange={(e) => handleChange(e)}
						sx={{width: '30%'}}
					/>
					<TextField
						name="lastName"
						label="Last name"
						required
						placeholder={patient.lastName}
						value={form.lastName.value}
						error={form.lastName.error}
						onChange={(e) => handleChange(e)}
						sx={{ml: 4, width: '40%'}}
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							id="dob"
							label="Date of birth *"
							required
							disableFuture
							minDate={dayjs("1900-01-01")}
							defaultValue={patient.dob == null ? dayjs() : dayjs(patient.dob)}
							onChange={(date) => patient.dob = date}
							sx={{ml: 4}}
						/>
					</LocalizationProvider>
				</Box>

				<TextField
					name="email"
					label="Email"
					placeholder={patient.email}
					value={form.email.value}
					error={form.email.error}
					onChange={(e) => handleChange(e)}
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
			<Box sx={{mt: 4, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
				<Button
					variant="contained"
					disabled>
					Previous
				</Button>
				<Button
					variant="contained"
					disabled={!valid}
					onClick={() => {
						patient.firstName = form.firstName.value;
						patient.lastName = form.lastName.value;
						patient.email = form.email.value;
						console.log(patient);
						handleNext();
					}}>
					Next Step
				</Button>
			</Box>
		</>
	);

}

export default PatientInfo;