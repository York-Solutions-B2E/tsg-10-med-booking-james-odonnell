import {createContext, useContext, useState, useEffect} from 'react';

import DataAPI from '../../API/DataAPI';

const AdminContext = createContext();
export const useAdminContext = () => {
	return useContext(AdminContext);
}

const AdminProvider = ({children}) => {

	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await DataAPI.request("doctors", "GET");

			if (data != null)
				setDoctors(JSON.parse(data));
		})();
	}, []);

	return (
		<AdminContext.Provider value={{doctors, setDoctors}}>
			{children}
		</AdminContext.Provider>
	);

}

export default AdminProvider;