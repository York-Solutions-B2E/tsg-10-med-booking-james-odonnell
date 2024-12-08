import {createContext, useContext, useState, useEffect} from 'react';

import {useAppContext} from '../../App';
import DataAPI from '../../API/DataAPI';

const AppointmentContext = createContext();

export const useAppointmentContext = () => {
	return useContext(AppointmentContext);
}

const AppointmentProvider = ({children}) => {

	const {navigate, userEmail} = useAppContext();
	const [appointments, setAppointments] = useState(null);

	useEffect(() => {
		if (appointments !== null)
			return;
		if (userEmail !== null) {
			(async () => {
				const data = await DataAPI.get(
					"appointments/patients", 
					{patientEmail: userEmail.toLowerCase()}
				);
				if (data === null)
					navigate("/");
				setAppointments(data);
			})();
		}
	}, [userEmail, appointments, navigate]);

	return (
		<AppointmentContext.Provider
			value={{
				appointments, setAppointments,}}>
			{children}
		</AppointmentContext.Provider>
	);

}

export default AppointmentProvider;