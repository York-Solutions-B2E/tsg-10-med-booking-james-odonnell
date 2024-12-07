import {useState, useEffect} from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import AppointmentTable from './components/AppointmentTable';
import {useAppContext} from '../../App';
import DataAPI from '../../API/DataAPI';
import Modal from '../../components/Modal';
import {validateEmail} from '../../util/Validate';

const MyAppointments = () => {

	const {navigate, userEmail, setUserEmail} = useAppContext();
	const [appointments, setAppointments] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalInput, setModalInput] = useState({email: null, error: false});

	useEffect(() => {
		if (appointments !== null)
			return;
		if (userEmail !== null) {
			(async () => {
				const data = await DataAPI.get("appointments/patients", {patientEmail: userEmail.toLowerCase()});
				if (data === null)
					setAppointments([]);
				else
					setAppointments(data);
			})();
		} else {
			setModalOpen(true);
		}
	}, [userEmail, modalOpen, appointments]);

	const handleModalChange = (value) => {
		setModalInput({
			email: value,
			error: !validateEmail(value)
		})
	}

	return (
		<Container sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
			{appointments === null ? null : <AppointmentTable appointments={appointments} />}
			<Modal
				open={modalOpen}
				setOpen={setModalOpen}
				title="Please provide your email, so we can get your appointments."
				content={[{
					content:
						<TextField
							name="email"
							label="Email"
							error={modalInput.error}
							required
							onChange={e => handleModalChange(e.target.value)} />}]}
				actions={[{
						title: "cancel",
						disabled: false,
						action: (() => navigate("/"))
					}, {
						title: "submit",
						disabled: modalInput.error || modalInput.email == null,
						action: (() => {
						setUserEmail(modalInput.email);
						setModalOpen(false);
					}
				)}]} />
		</Container>
	);

}

export default MyAppointments;