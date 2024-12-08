import {useState} from 'react';

import Container from '@mui/material/Container';

import {useAppContext} from '../../App';
import {useAdminContext} from './AdminContext';
import DoctorTable from './components/DoctorTable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const DoctorList = () => {

	const {navigate} = useAppContext();
	const {doctors, setDoctors} = useAdminContext();

	const handleDelete = (index) => {
		console.log(index);
	}

	return (
		<Container sx={{mt: 4}}>
			<DoctorTable doctors={doctors} handleDelete={handleDelete}/>
			<Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
				<Button
					// onClick={() => navigate("/new")}
					variant="contained">
					new doctor
				</Button>
			</Box>
		</Container>
	);

}

export default DoctorList;