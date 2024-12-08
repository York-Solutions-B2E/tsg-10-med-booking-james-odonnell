import {Routes, Route} from 'react-router-dom';

import MyAppointments from './MyAppointments';
import EditAppointment from './EditAppointment';
import AppointmentProvider from './AppointmentContext';

const AppointmentRouter = () => {

	return (
		<AppointmentProvider>
			<Routes>
				<Route path="/list" element={<MyAppointments />} />
				<Route path="/edit/:index" element={<EditAppointment />} />
			</Routes>
		</AppointmentProvider>
	);

}

export default AppointmentRouter;