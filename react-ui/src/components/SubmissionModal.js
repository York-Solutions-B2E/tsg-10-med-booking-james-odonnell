import {useState} from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import Divider from '@mui/material/Divider';

import DataAPI from '../API/DataAPI';
import {useBookingContext} from '../pages/Booking';

const SubmissionModal = ({open, setOpen}) => {

	const {patient, doctor, appointment} = useBookingContext();

	const style = {
	  position: 'absolute',
	  top: '50%',
	  left: '50%',
	  transform: 'translate(-50%, -50%)',
	  width: 400,
	  bgcolor: 'background.paper',
	  border: '2px solid #000',
	  boxShadow: 24,
	  p: 4,
	};

	const handleClose = () => {
		console.log("close");
		setOpen(false);
	}

	const submit = async () => {
		appointment.patient = patient;
		appointment.doctor = doctor;
		appointment.patient.id = appointment.patient.id == null ? -1 : appointment.patient.id;
		await DataAPI.post("appointments/new", {"content-type": "application/json"}, JSON.stringify(appointment));
		window.location.href = "http://localhost:3000/";
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle><Typography>Are you sure you want to submit?</Typography></DialogTitle>
				<DialogContent>
					<Divider />
					<DialogTitle><Typography>Patient information</Typography></DialogTitle>
					<DialogContentText>
						First name: {patient.firstName} <br />
						Last name: {patient.lastName}	<br />
						Date of birth: {dayjs(patient.dob).format("MM/DD/YYYY")} <br/>
						Email: {patient.email} <br />
					</DialogContentText>
					<Divider />
					<DialogTitle><Typography>Doctor selection</Typography></DialogTitle>
					<DialogContentText>
						Doctor: {`${doctor.firstName} ${doctor.lastName}`} <br/>
						Specialization: {doctor.specialization.name}
					</DialogContentText>
					<Divider />
					<DialogTitle><Typography>Details</Typography></DialogTitle>
					<DialogContentText>
						Date: {dayjs(appointment.dateTime).format("MM/DD/YYYY")} <br/>
						Time: {dayjs(appointment.dateTime).format("hh:mm A")} <br/>
						Visit type: {appointment.visitType}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={submit}>Submit</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default SubmissionModal;