import {createContext, useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {useAppContext} from '../../App';
import {usePatientContext} from '../PatientContext';
import DataAPI from '../../API/DataAPI';
import Modal from '../../components/Modal';

const AppointmentContext = createContext();

export const useAppointmentContext = () => {
	return useContext(AppointmentContext);
}

const AppointmentProvider = ({children}) => {

	const {navigate} = useAppContext();
	const {patientInfo, setPatientInfo} = usePatientContext();
	const [appointments, setAppointments] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (appointments !== null)
			return;
		if (patientInfo.email !== '') {
			(async () => {
				const data = await DataAPI.request(
					"appointments/patients", "GET",
					{patientEmail: patientInfo.email.toLowerCase()}
				);
				if (data === null) {
					setModalOpen(true);
					setPatientInfo({
						...patientInfo,
						email: '',
					});
					return;
				}
				setAppointments(JSON.parse(data));
			})();
		}
	}, [patientInfo, appointments, navigate]);

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