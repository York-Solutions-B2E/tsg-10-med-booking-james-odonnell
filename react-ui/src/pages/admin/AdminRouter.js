import {Routes, Route} from 'react-router-dom';

import AdminProvider from './AdminContext';
import DoctorList from './DoctorList';

const AdminRouter = () => {

	return (
		<AdminProvider>
			<Routes>
				<Route path="/doctors" element={<DoctorList />} />
			</Routes>
		</AdminProvider>
	);

}

export default AdminRouter;