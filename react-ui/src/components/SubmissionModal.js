import dayjs from 'dayjs';

import DataAPI from '../API/DataAPI';
import {useBookingContext} from '../pages/Booking';
import Modal from '../components/Modal';
import {useAppContext} from '../App';

const SubmissionModal = ({open, setOpen}) => {

	const {patient, doctor, appointment} = useBookingContext();
	const {navigate} = useAppContext();

	const handleClose = () => {
		console.log("close");
		setOpen(false);
	}

	const submit = async () => {
		patient.email = patient.email.toLowerCase();
		appointment.patient = patient;
		appointment.doctor = doctor;
		appointment.patient.id = appointment.patient.id == null ? -1 : appointment.patient.id;
		await DataAPI.post("appointments/new", {"content-type": "application/json"}, JSON.stringify(appointment));
		navigate("/");
	}

	const title = "Are you sure you want to submit?"

	const content = [{
			title: "Patient information",
			content:
				<p>
					First name: {patient.firstName}<br />
					Last name: {patient.lastName}<br />
					Date of birth: {dayjs(patient.dob).format("MM/DD/YYYY")}<br />
					Email: {patient.email}
				</p>
				
		}, {
			title: "Doctor",
			content:
				<p>
					Doctor: {doctor.firstName} {doctor.lastName}<br />
					Specialization: {doctor.specialization.name}<br />
				</p>
		}, {
			title: "Details",
			content:
				<p>
					Date: {dayjs(appointment.dateTime).format("MM/DD/YYYY")}<br />
					Time: {dayjs(appointment.dateTime).format("hh:mm A")}<br />
					Visit type: {appointment.visitType}<br />
				</p>
		},
	];

	const actions = [{
			title: "Cancel",
			action: handleClose
		}, {
			title: "Submit",
			action: submit
		}
	];

	return <Modal title={title} content={content} actions={actions} open={open} setOpen={setOpen} />

}

export default SubmissionModal;