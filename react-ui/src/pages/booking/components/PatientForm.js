import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

const PatientForm = ({form, handleChange}) => {

	return (
		<Paper component="form" elevation={5} sx={{padding: 4}}>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
				<TextField
					name="firstName"
					label="First name"
					required
					value={form.firstName.value}
					error={form.firstName.error}
					onChange={(e) => handleChange(e.target.value, e.target.name)}
					sx={{width: '30%'}}
				/>
				<TextField
					name="lastName"
					label="Last name"
					required
					value={form.lastName.value}
					error={form.lastName.error}
					onChange={(e) => handleChange(e.target.value, e.target.name)}
					sx={{ml: 4, width: '40%'}}
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						id="dob"
						label="Date of birth *"
						required
						disableFuture
						minDate={dayjs("1900-01-01")}
						maxDate={dayjs().subtract(18, 'year')}
						defaultValue={form.dob.value == null ? null : dayjs(form.dob.value)}
						onChange={(date) => handleChange(date, "dob")}
						sx={{ml: 4}}
					/>
				</LocalizationProvider>
			</Box>

			<TextField
				name="email"
				label="Email"
				value={form.email.value}
				error={form.email.error}
				onChange={(e) => handleChange(e.target.value, e.target.name)}
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

export default PatientForm;