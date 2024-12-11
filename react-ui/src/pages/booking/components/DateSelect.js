import {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import dayjs from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {DigitalClock} from '@mui/x-date-pickers/DigitalClock';

import DataAPI from '../../../API/DataAPI';
import {dateConfilcts, timeConfilcts} from '../../../util/Validate';

const DateSelect = ({form, setForm, patientEmail, doctorId}) => {

	const [minTime, setMinTime] = useState(null);
	const [minDate, setMinDate] = useState(dayjs());
	const [patientAppointments, setPatientAppointments] = useState(null);
	const [doctorAppointments, setDoctorAppointments] = useState(null);

	const [now] = useState(dayjs());
	const [nineAM] = useState(now.set('hour', 9).startOf('hour'));
	const [fourPM] = useState(now.set('hour', 16).startOf('hour'));

	useEffect(() => {
		console.log(form);

		if (patientAppointments === null) {
			(async () => {
				const data = await DataAPI.request(
						"appointments/patients", "GET",
						{patientEmail: patientEmail.toLowerCase()});
				// console.log(data);
				if (data !== null)
					setPatientAppointments(JSON.parse(data));
				else
					setPatientAppointments([]);
			})();
		}

		if (doctorAppointments === null) {
			(async () => {
				const data = await DataAPI.request(
						"appointments/doctors", "GET",
						{doctorId: doctorId});
				console.log(data);
				if (data !== null)
					setDoctorAppointments(JSON.parse(data));
				else
					setDoctorAppointments([]);
			})();
		}

		if (dayjs().isBefore(nineAM) || (form.date != null && dayjs().isBefore(form.date))) {
			setMinTime(nineAM);
		} else {
			let time = now.add(1, 'hour').hour();
			time = now.set('hour', time).startOf('hour');
			if (now.isBetween(fourPM, nineAM.add(1, 'day'))) {
				setMinTime(nineAM);
				setMinDate(dayjs().add(1, 'day'));
			} else {
				setMinTime(time);
			}
		}
	}, [form.date, fourPM, nineAM, now, patientEmail, form, patientAppointments]);

	const handleChange = (value, field) => {
		console.log(value, field);
		form = {
			...form,
			[field]: value,
		}
		form.valid =
			form.date !== null &&
			form.time != null &&
			form.visitType != null;
		setForm(form);
	}

	return (
		<>
			<Paper elevation={5}>
				<Grid container sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', p: 4}}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Grid item md={4}>
							<DateCalendar
								required
								disablePast
								shouldDisableDate={(date) => dateConfilcts(date, patientAppointments, doctorId)}
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
											doctorAppointments)
										: null}
									minTime={minTime}
									maxTime={fourPM}
									onChange={(value) => handleChange(value, "time")}
								/>
								<RadioGroup sx={{width: '10%', mt: 4}}>
									<FormControlLabel
										label="In person"
										control={<Radio
											onChange={(e) => handleChange(e.target.value, "visitType")}
										/>}
										value="IN_PERSON"
									/>
									<FormControlLabel
										label="Telehealth"
										control={<Radio
											onChange={(e) => handleChange(e.target.value, "visitType")}
										/>}
										value="TELEHEALTH"
									/>
								</RadioGroup>
							</Stack>
						</Grid>
					</LocalizationProvider>
				</Grid>
			</Paper>
		</>
	);
}

export default DateSelect;