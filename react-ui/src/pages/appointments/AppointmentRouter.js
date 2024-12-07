import {Routes, Route} from 'react-router-dom';

import MyAppointments from './MyAppointments';
import EditAppointment from './EditAppointment';

const AppointmentRouter = () => {

	return (
		<Routes>
			<Route path="/list" element={<MyAppointments />} />
			<Route path="/edit/:id" element={<EditAppointment />} />
		</Routes>
	);

}

export default AppointmentRouter;