import {Routes, Route} from 'react-router-dom';

import AdminProvider from './AdminContext';
import DoctorList from './DoctorList';
import NewDoctor from './NewDoctor';

const AdminRouter = () => {

	return (
		<AdminProvider>
			<Routes>
				<Route path="/doctors" element={<DoctorList />} />
				<Route path="/doctors/new" element={<NewDoctor />} />
			</Routes>
		</AdminProvider>
	);

}

export default AdminRouter;