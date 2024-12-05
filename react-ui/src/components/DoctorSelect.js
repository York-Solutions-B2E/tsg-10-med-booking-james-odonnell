import {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import DataAPI from '../API/DataAPI';
import {useBookingContext} from '../pages/Booking';

const DoctorSelect = () => {

	const [specializations, setSpecializations] = useState([]);
	const [doctorNames, setDoctorNames] = useState([]);
	const {doctor} = useBookingContext();
	let effect = false;

	useEffect(() => {
		if (effect)
			return;
		effect = true;
		(async () => {
			const data = await DataAPI.get("specializations");
			if (data != null && data.length >= 0) {
				const names = [];
				data.map((entry, index) => {names[index] = entry.name;})
				setSpecializations(names);
			}
		})()
	}, []);

	const handleSpecializationSelect = async (value) => {
		console.log(value);
		if (value == null) {
			doctor.specialization.id = null;
			doctor.specialization.name = '';
			setDoctorNames([]);
			return;
		}
		const id = specializations.indexOf(value) + 1;
		doctor.specialization = {id: id, name: value}
		const data = await DataAPI.get("doctors/specialization", {
				specializationId: doctor.specialization.id
		});
		data.map((doc, index) => {
			doctorNames[index] = doc.firstName + " " + doc.lastName;
		});
	}

	const handleDoctorSelect = async (value) => {
		console.log(value);
		console.log(doctorNames.indexOf(value));
		doctor.id = doctorNames.indexOf(value) + 1;
	}

	return (
		<Paper elevation={5} sx={{width: '100%', padding: 4}}>
			<Grid container spacing={4}>
				<Grid item md={12} sx={{display: 'flex', justifyContent: 'center'}}>
					<Autocomplete
						options={specializations}
						sx={{width: '50%'}}
						onChange={(e, newValue) => handleSpecializationSelect(newValue)}
						renderInput={(params) => <TextField {...params} label="Specialization"/>}
					/>
				</Grid>
				<Grid item md={12} sx={{display: 'flex', justifyContent: 'center'}}>
					<Autocomplete
						disabled={doctor.specialization.name === ''}
						options={doctorNames}
						sx={{width: '50%'}}
						onChange={(e, newValue) => handleDoctorSelect(newValue)}
						renderInput={(params) => <TextField {...params} label="Doctor"/>}
					/>
				</Grid>
			</Grid>
		</Paper>
	);

}

export default DoctorSelect;