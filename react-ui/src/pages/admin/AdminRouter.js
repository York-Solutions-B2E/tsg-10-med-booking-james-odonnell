import {Routes, Route} from 'react-router-dom';

import AdminProvider from './AdminContext';
import DoctorList from './DoctorList';
import NewDoctor from './NewDoctor';
import EditDoctor from './EditDoctor';

const AdminRouter = () => {

	return (
		<AdminProvider>
			<Routes>
				<Route path="/doctors" element={<DoctorList />} />
				<Route path="/doctors/new" element={<NewDoctor />} />
				<Route path="/doctors/edit/:index" element={<EditDoctor />} />
			</Routes>
		</AdminProvider>
	);

}

export default AdminRouter;