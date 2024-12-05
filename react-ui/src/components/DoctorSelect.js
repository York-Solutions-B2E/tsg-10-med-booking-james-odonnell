import {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import DataAPI from '../API/DataAPI';
import {useBookingContext} from '../pages/Booking';

const DoctorSelect = () => {

	const [specializations, setSpecializations] = useState([]);
	const [doctors, setDoctors] = useState([]);
	const [defName, setDefName] = useState(null);
	const {doctor} = useBookingContext();
	let effect = false;

	useEffect(() => {
		if (effect)
			return;
		effect = true;
		(async () => {
			const data = await DataAPI.get("specializations");
			if (data != null)
				setSpecializations(data);
			if (doctor.specialization.id != null) {
				console.log("doctor.spec.id = null")
				const data = await DataAPI.get("doctors/specialization", {
					specializationId: doctor.specialization.id
				});
				setDoctors(data);
				if (doctor.firstName !== '')
					setDefName(doctor.firstName + " " + doctor.lastName);
			}
		})()
	}, []);

	const handleSpecializationSelect = async (value) => {
		if (value == null) {
			doctor.specialization.id = null;
			doctor.specialization.name = '';
			doctor.firstName = '';
			doctor.lastName = '';
			setDoctors([]);
		}
		let spec = null;
		for (let i = 0;i < specializations.length;i++) {
			if (specializations[i].name === value) {
				spec = specializations[i];
				break;
			}
		}
		if (spec == null)
			return;
		console.log(spec);
		const data = await DataAPI.get("doctors/specialization", {
			specializationId: spec.id
		});
		if (data != null) {
			doctor.specialization = spec;
			console.log(doctor.specialization);
			setDoctors(data);
		}
	}

	const handleDoctorSelect = async (value) => {
		console.log(value);
		if (value == null) {
			doctor.firstName = '';
			doctor.lastName = '';
			setDefName(null);
			return;
		}

		for (let i = 0;i < doctors.length;i++) {
			if (value === doctors[i].firstName + " " + doctors[i].lastName) {
				doctor.firstName = doctors[i].firstName;
				doctor.lastName = doctors[i].lastName;
				setDefName(value);
				break;
			}
		}
		console.log(doctor);
	}

	return (
		<Paper elevation={5} sx={{width: '100%', padding: 4}}>
			<Grid container spacing={4}>
				<Grid item md={12} sx={{display: 'flex', justifyContent: 'center'}}>
					<Autocomplete
						value={doctor.specialization.name}
						options={specializations.map((spec) => spec.name)}
						sx={{width: '50%'}}
						onChange={(e, newValue) => handleSpecializationSelect(newValue)}
						renderInput={(params) => <TextField {...params} label="Specialization"/>}
					/>
				</Grid>
				<Grid item md={12} sx={{display: 'flex', justifyContent: 'center'}}>
					<Autocomplete
						key={setDefName}
						value={defName}
						disabled={doctor.specialization.name === ''}
						options={doctors.map((doctor) => doctor.firstName + " " + doctor.lastName)}
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