import {useState, useEffect} from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import {useAppointmentContext} from './AppointmentContext';
import AppointmentTable from './components/AppointmentTable';
import {useAppContext} from '../../App';
import Modal from '../../components/Modal';
import {validateEmail} from '../../util/Validate';

const MyAppointments = () => {

	const {appointments, setAppointments} = useAppointmentContext();
	const {navigate, userEmail, setUserEmail} = useAppContext();
	const [modalOpen, setModalOpen] = useState(false);
	const [modalInput, setModalInput] = useState({email: null, error: false});

	useEffect(() => {
		if (appointments !== null)
			return;
		if (userEmail === null)
			setModalOpen(true);
 	}, [userEmail, appointments]);

	return (
		<Container sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
			{appointments && <AppointmentTable />}
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
							sx={{mt: 4}}
							onChange={e => setModalInput({
								email: e.target.value,
								error: !validateEmail(e.target.value)
							})} />}]}
				actions={[{
						title: "cancel",
						disabled: false,
						action: (() => navigate("/"))
					}, {
						title: "submit",
						disabled: modalInput.error || modalInput.email == null,
						action: (async () => {
							setModalOpen(false);
							setUserEmail(modalInput.email);
					}
				)}]} />
		</Container>
	);

}

export default MyAppointments;