import {createContext, useContext, useState, useEffect} from 'react';

import {useAppContext} from '../../App';
import DataAPI from '../../API/DataAPI';

const AdminContext = createContext();
export const useAdminContext = () => {
	return useContext(AdminContext);
}

const AdminProvider = ({children}) => {

	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await DataAPI.get("doctors", {});
			console.log(data);
			if (data != null)
				setDoctors(data);
		})();
	}, []);

	return (
		<AdminContext.Provider value={{doctors, setDoctors}}>
			{children}
		</AdminContext.Provider>
	);

}

export default AdminProvider;