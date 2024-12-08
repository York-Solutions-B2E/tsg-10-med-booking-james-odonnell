import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import dayjs from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {DigitalClock} from '@mui/x-date-pickers/DigitalClock';

const EditForm = (props) => {

	const {
		specializations,
		doctors,
		minDate,
		minTime,
		form,
		handleChange,
		appointmentConflicts
	} = props.props;

	return (
		<Paper sx={{pb: 4}} elevation={5} >
			<Grid container spacing={4} >
				<Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}} >
					<Stack sx={{width: '50%'}}>
						<Autocomplete
							id="specialization"
							value={form.specialization.name}
							options={specializations.map((spec) => spec.name)}
							onChange={(e, newValue) => handleChange(newValue, "specialization", e)}
							renderInput={(params) => <TextField {...params} label="Specialization"/>}
						/>
						<Box sx={{m: 2}} />
						<Autocomplete
							id="doctor"
							value={form.fullName}
							disabled={form.specialization.name === ''}
							options={doctors.map((doctor) => doctor.firstName + " " + doctor.lastName)}
							onChange={(e, newValue) => handleChange(newValue, "doctor", e)}
							renderInput={(params) => <TextField {...params} label="Doctor"/>}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}} >
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Grid item md={4}>
							<DateCalendar
								required
								disablePast
								shouldDisableDate={appointmentConflicts}
								minDate={minDate}
								value={form.date}
								onChange={(value) => handleChange(value, "date")}
							/>
						</Grid>
						<Grid item md={2} sx={{mx: 4}}>
							<Stack>
								<DigitalClock
									disabled={form.date === null}
									skipDisabled
									minTime={minTime}
									maxTime={dayjs().set('hour', 16).startOf('hour')}
									onChange={(value) => handleChange(value, "time")}
								/>
								<RadioGroup sx={{width: '10%', mt: 4}}>
									<FormControlLabel label="In person" control={<Radio onChange={(e) => handleChange(e.target.value, "visitType")}/>} value={"IN_PERSON"}/>
									<FormControlLabel label="Telehealth" control={<Radio onChange={(e) => handleChange(e.target.value, "visitType")}/>} value={"TELEHEALTH"}/>
								</RadioGroup>
							</Stack>
						</Grid>
					</LocalizationProvider>
				</Grid>
			</Grid>
		</Paper>
	);

}

export default EditForm;