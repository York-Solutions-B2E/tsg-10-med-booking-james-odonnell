import {Routes, Route} from 'react-router-dom';

import AdminProvider from './AdminContext';
import DoctorList from './DoctorList';
import ManageDoctor from './ManageDoctor';

const AdminRouter = () => {

	return (
		<AdminProvider>
			<Routes>
				<Route path="/doctors" element={<DoctorList />} />
				<Route path="/doctors/new" element={<ManageDoctor />} />
				<Route path="/doctors/edit/:index" element={<ManageDoctor />} />
			</Routes>
		</AdminProvider>
	);

}

export default AdminRouter;