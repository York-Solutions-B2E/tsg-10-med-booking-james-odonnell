import {Routes, Route} from 'react-router-dom';

import PatientProvider, {usePatientContext} from './PatientContext';
import Home from './Home';
import Booking from './Booking';
import AppointmentRouter from './appointments/AppointmentRouter';

const PatientRouter = () => {

	return (
		<PatientProvider>
			<Routes>
				<Route path="/booking" element={<Booking />} />
				<Route path="/myappointments/*" element={<AppointmentRouter />} />
				<Route path="/*" element={<Home />} />
			</Routes>
		</PatientProvider>
	);

}

export default PatientRouter;