import {createContext, useContext, useState, useEffect} from 'react';

import Button from '@mui/material/Button';

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
				const patient = await DataAPI.request(
					"patients/getinfo", "GET",
					{patientEmail: patientInfo.email.toLowerCase()});
				if (patient !== null) {
					setPatientInfo(JSON.parse(patient));
				} else {
					setModalOpen(true);
					setPatientInfo({
						...patientInfo,
						email: '',
					});
					return;
				}
				const data = await DataAPI.request(
					"appointments/patients", "GET",
					{patientEmail: patientInfo.email.toLowerCase()}
				);
				if (data === null) {
					setAppointments([]);
					return;
				}
				setAppointments(JSON.parse(data));
			})();
		}
	}, [patientInfo, setPatientInfo, appointments, navigate]);

	return (
		<AppointmentContext.Provider value={{appointments, setAppointments}}>
			{!modalOpen && children}
			<Modal
				open={modalOpen}
				setOpen={setModalOpen}
				title="No appointments found."
				content={[{
					content:
						<Button
							onClick={() => setModalOpen(false)}
							to="/booking">
							Click here to book an appointment.
						</Button>,
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