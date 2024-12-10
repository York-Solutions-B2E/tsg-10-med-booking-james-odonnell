import {useState, useEffect} from 'react';
import {useParams} from 'react';

import Container from '@mui/material/Container';

import {useAdminContext} from './AdminContext';

const DoctorView = () => {

	const {index} = useParams();
	const {doctors} = useAdminContext();
	const [doctor, setDoctor] = useState(doctors[index]);
	const [appointments, setAppointments] = useState([]);

	return (
		<Container>
		</Container>
	);

}

export default DoctorView;