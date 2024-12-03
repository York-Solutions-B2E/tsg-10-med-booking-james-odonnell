import {useState, useEffect} from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const columns = [
	{field: 'id', headerName: 'ID', width: 130},
	{field: 'doctor', headerName: 'Doctor', width: 130},
	{field: 'patient', headerName: 'Patient', width: 130},
	{field: 'type', headerName: 'Type', width: 130},
	{field: 'date', headerName: 'Date', width: 130},
	{field: 'time', headerName: 'Time', width: 130},	
	{field: 'status', headerName: 'Status', width: 130},
];

const Appoinments = () => {

	const [appointments, setAppointments] = useState([]);
	const paginationModel = {page: 0, pageSize: 10};

	useEffect(() => {
		fetch('appointments', {mode: 'no-cors'})
			.then(response => response.text())
			.then(body => {
				if (body !== '') {
					setAppointments(JSON.parse(body));
				}
			})
	}, [setAppointments]);

	const getDate = (appointmentDate) => {
		let date = appointmentDate.getMonth() + 1 + '/';
		date += appointmentDate.getDate();
		return date;
	}

	const getTime = (appointmentDate) => {
		let time = appointmentDate.getHours();
		if (time > 12) {
			time -= 12;
			time += ' PM';
		} else {
			time += ' AM';
		}
		return time;
	}

	return (
		<Container>
			<Paper sx={{height: 400, width: '100%'}}>
	      <DataGrid
	        rows={appointments.map((appointment) => {
	        	return {
	        		id: appointment.id,
	        		doctor: appointment.doctor.firstName + ' ' + appointment.doctor.lastName,
	        		patient: appointment.patient.firstName + ' ' + appointment.patient.lastName,
	        		date: getDate(new Date(appointment.dateTime)),
	        		time: getTime(new Date(appointment.dateTime)),
	        		type: (appointment.isInPerson ? "In person" : "Telehealth"),
	        		status: appointment.status};
	        })}
	        columns={columns}
	        initialState={{pagination: {paginationModel}}}
	        pageSizeOptions={[5, 10]}
	        checkboxSelection
	        sx={{border: 0}}/>
	    </Paper>

	    {/*<Button onClick={() => console.log(appointments)}>Click me</Button>*/}

		</Container>
	);
}

export default Appoinments;