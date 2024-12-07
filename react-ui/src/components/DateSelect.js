import {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {DigitalClock} from '@mui/x-date-pickers/DigitalClock';

import DataAPI from '../API/DataAPI';
import {useBookingContext} from '../pages/Booking';

const DateSelect = () => {

	const {patient, doctor, appointment, handlePrevious, handleNext} = useBookingContext();
	const [valid, setValid] = useState(false);
	const [minTime, setMinTime] = useState(null);
	const [minDate, setMinDate] = useState(dayjs());
	const [patAppts, setPatAppts] = useState([]);
	const [docAppts, setDocAppts] = useState([]);
	const [form, setForm] = useState({
		date: null,
		time: null,
		visitType: null
	});

	const now = dayjs();
	const nineAM = now.set('hour', 9).startOf('hour')
	const fourPM = now.set('hour', 16).startOf('hour');

	useEffect(() => {
		console.log(form);
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
		(async () => {
			const doctorAppointments = await DataAPI.get("appointments/doctors", {doctorId: doctor.id});
			setDocAppts(doctorAppointments);
			console.log(patient.email);
			const patientAppointments = await DataAPI.get("appointments/patients", {patientEmail: patient.email});
			setPatAppts(patientAppointments);
		})();
	}, [form.date]);

	useEffect(() => {
		setValid(form.date != valid && form.time != null && form.visitType != null);
	}, [form])

	const handleChange = (value, field) => {
		console.log(value, field);
		setForm({
			...form,
			[field]:
				value
		});
	}

	const appointmentConflicts = (date) => {
		let day = date.day();
		if (day === 0 || day === 6)
			return true;

		if (patAppts != null)
			for (let i = 0;i < patAppts.length;i++) {
				let apptDate = dayjs(patAppts[i].dateTime).get('date');
				if (date.get('date') === apptDate && patAppts[i].doctorId == doctor.id)
					return true;
			}
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
								shouldDisableDate={appointmentConflicts}
								minDate={minDate}
								onChange={(value) => handleChange(value, "date")}
							/>
						</Grid>
						<Grid item md={2} sx={{ml: 4}}>
							<Stack>
								<DigitalClock
									disabled={form.date == null}
									skipDisabled
									minTime={minTime}
									maxTime={fourPM}
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
			</Paper>
			<Box sx={{mt: 4, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
				<Button
					variant="contained"
					onClick={() => {
						handlePrevious();
					}}>
					Previous
				</Button>
				<Button
					variant="contained"
					disabled={!valid}
					onClick={() => {
						appointment.dateTime = form.date.add(form.time.hour(), 'hour');
						appointment.dateTime = appointment.dateTime.add(form.time.minute(), 'minute');
						appointment.visitType = form.visitType;
						handleNext();
					}}>
					Submit
				</Button>
			</Box>
		</>
	);
}

export default DateSelect;