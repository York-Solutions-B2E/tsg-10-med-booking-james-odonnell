import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {DigitalClock} from '@mui/x-date-pickers/DigitalClock';

import {dateConfilcts, timeConfilcts} from '../util/Validate';

const DateTimeForm = ({form, patientAppointments, doctorId, doctorAppointments, minDate, minTime, maxTime, handleChange, filterDates}) => {

	if (form === null || patientAppointments === null || doctorAppointments === null)
		return;

	return (
		<Grid container sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', p: 4}}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Grid item md={4}>
					<DateCalendar
						required
						disablePast
						disabled={doctorId === null}
						shouldDisableDate={filterDates ?
							(date) => filterDates(date) :
							(date) => dateConfilcts(date, patientAppointments, doctorId)}
						minDate={minDate}
						value={form.date}
						onChange={(value) => handleChange(value, "date")}
					/>
				</Grid>
				<Grid item md={2} sx={{ml: 4}}>
					<Stack>
						<DigitalClock
							disabled={form.date == null}
							skipDisabled
							shouldDisableTime={form.date !== null ?
								(time) => timeConfilcts(
									time,
									form.date.format("YYYY-MM-DD"),
									patientAppointments,
									doctorAppointments
								) : null}
							minTime={minTime}
							maxTime={maxTime}
							value={form.time}
							onChange={(value) => handleChange(value, "time")}
						/>
						<RadioGroup sx={{width: '10%', mt: 4}}>
							<FormControlLabel
								label="In person"
								control={<Radio
									onChange={(e) => handleChange(e.target.value, "visitType")}
								/>}
								value="IN_PERSON"
								checked={form.visitType !== null && form.visitType === "IN_PERSON"}
							/>
							<FormControlLabel
								label="Telehealth"
								control={<Radio
									onChange={(e) => handleChange(e.target.value, "visitType")}
								/>}
								value="TELEHEALTH"
								checked={form.visitType !== null && form.visitType === "TELEHEALTH"}
							/>
						</RadioGroup>
					</Stack>
				</Grid>
			</LocalizationProvider>
		</Grid>
	);

}

export default DateTimeForm;