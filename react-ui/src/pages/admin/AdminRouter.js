import {Routes, Route} from 'react-router-dom';

import AdminProvider from './AdminContext';
import DoctorList from './DoctorList';
import NewDoctor from './NewDoctor';
import DoctorView from './DoctorView';
import EditDoctor from './EditDoctor';

const AdminRouter = () => {

	return (
		<AdminProvider>
			<Routes>
				<Route path="/doctors" element={<DoctorList />} />
				<Route path="/doctors/new" element={<NewDoctor />} />
				<Route path="/doctors/:idnex" element={<DoctorView />} />
				<Route path="/doctors/:index/edit" element={<EditDoctor />} />
			</Routes>
		</AdminProvider>
	);

}

export default AdminRouter;