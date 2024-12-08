import dayjs from 'dayjs';

import Typography from '@mui/material/Typography';

import Modal from '../components/Modal';

const SubmissionModal = ({open, setOpen, cancel, confirmSubmit, form, patient, doctor, specialization, appointment}) => {

	console.log(form);

	const title = "Are you sure you want to submit?"

	const warning = appointment.visitType === "IN_PERSON" ?
		<Typography color="lightBlue">Please arrive 15 minutes<br/>before your appointment.</Typography> : null

	const content = [ patient !== null ? {
			title: "Patient information",
			content:
				<p>
					First name: {patient.firstName}<br />
					Last name: {patient.lastName}<br />
					Date of birth: {dayjs(patient.dob).format("MM/DD/YYYY")}<br />
					Email: {patient.email}
				</p>
				
		} : {}, {
			title: "Doctor",
			content:
				<p>
					Doctor: {doctor.firstName} {doctor.lastName}<br />
					Specialization: {specialization.name}<br />
				</p>
		}, {
			title: "Details",
			content:
				<p>
					Date: {dayjs(form.date).format("MM/DD/YYYY")}<br />
					Time: {dayjs(form.time).format("hh:mm A")}<br />
					Visit type: {appointment.visitType}<br />
				</p>
		},
	];

	const actions = [{
			title: "Cancel",
			action: cancel
		}, {
			title: "Submit",
			action: confirmSubmit
		}
	];

	return (
		<Modal
			title={title}
			warning={warning}
			content={content}
			actions={actions}
			open={open}
			setOpen={setOpen}
		/>
	);

}

export default SubmissionModal;