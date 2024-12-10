import {createContext, useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {useAppContext} from '../../App';
import DataAPI from '../../API/DataAPI';
import Modal from '../../components/Modal';

const AppointmentContext = createContext();

export const useAppointmentContext = () => {
	return useContext(AppointmentContext);
}

const AppointmentProvider = ({children}) => {

	const {navigate, userEmail, setUserEmail} = useAppContext();
	const [appointments, setAppointments] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (appointments !== null)
			return;
		if (userEmail !== null) {
			(async () => {
				const data = await DataAPI.get(
					"appointments/patients",
					{patientEmail: userEmail.toLowerCase()}
				);
				if (data === null) {
					setModalOpen(true);
					setUserEmail(null);
					return;
				}
				setAppointments(data);
			})();
		}
	}, [userEmail, appointments, navigate]);

	return (
		<AppointmentContext.Provider value={{appointments, setAppointments}}>
			{children}
			<Modal
				open={modalOpen}
				setOpen={setModalOpen}
				title="No appointments found."
				content={[{
					content:
						<Link
							onClick={() => setModalOpen(false)}
							to="/booking">
							Click here to book an appointment.
						</Link>,
				}]}
				actions={[{
					title: "cancel",
					disabled: false,
					action: (() => navigate("/")),
				}]}
			/>
		</AppointmentContext.Provider>
	);

}

export default AppointmentProvider;