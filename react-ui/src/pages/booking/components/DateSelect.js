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
import DateTimeForm from '../../../components/DateTimeForm';

const DateSelect = ({form, setForm, patientEmail, doctorId}) => {

	const [minTime, setMinTime] = useState(null);
	const [minDate, setMinDate] = useState(dayjs());
	const [patientAppointments, setPatientAppointments] = useState(null);
	const [doctorAppointments, setDoctorAppointments] = useState(null);

	const [now] = useState(dayjs());
	const [nineAM] = useState(now.set('hour', 9).startOf('hour'));
	const [fourPM] = useState(now.set('hour', 16).startOf('hour'));

	useEffect(() => {

		if (patientAppointments === null) {
			(async () => {
				const data = await DataAPI.request(
					"appointments/patients", "GET",
					{patientEmail: patientEmail.toLowerCase()}
				);
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
					{doctorId: doctorId}
				);
				if (data !== null)
					setDoctorAppointments(JSON.parse(data));
				else
					setDoctorAppointments([]);
			})();
		}

	}, [patientEmail, form, patientAppointments, doctorAppointments, doctorId]);

	useEffect(() => {
		if (now.isBefore(nineAM) || (form.date != null && dayjs().isBefore(form.date))) {
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
	}, [now, form.date, fourPM, nineAM]);

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
		<Paper elevation={5}>
			<DateTimeForm
				form={form}
				patientAppointments={patientAppointments}
				doctorId={doctorId}
				doctorAppointments={doctorAppointments}
				minDate={minDate}
				minTime={minTime}
				maxTime={fourPM}
				handleChange={handleChange}
			/>
		</Paper>
	);
}

export default DateSelect;