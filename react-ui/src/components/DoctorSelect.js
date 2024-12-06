import {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import DataAPI from '../API/DataAPI';
import {useBookingContext} from '../pages/Booking';

const DoctorSelect = () => {

	const {doctor, handleNext, handlePrevious} = useBookingContext();
	const [specializations, setSpecializations] = useState([]);
	const [doctors, setDoctors] = useState([]);
	const [valid, setValid] = useState(false);
	const [form, setForm] = useState({
		specialization: {
			id: doctor.specialization.id,
			name: doctor.specialization.name,
		},
		doctor: {
			id: doctor.id,
			firstName: doctor.firstName,
			lastName: doctor.lastName
		},
		fullName: doctor.firstName + " " + doctor.lastName
	});
	let effect = false;

	useEffect(() => {
		if (form.specialization.id != null && form.doctor.id != null)
			setValid(true);
		if (form.fullName === " ")
			setForm({
				...form,
				fullName: ''
			});
		if (effect)
			return;
		effect = true;
		(async () => {
			const data = await DataAPI.get("specializations");
			if (data != null)
				setSpecializations(data);
			if (form.specialization.id != null) {
				const data = await DataAPI.get("doctors/specialization", {
					specializationId: form.specialization.id
				});
				setDoctors(data);
			}
		})();
	}, [form]);

	const handleChange = (e, value, name) => {
		let field;
		const {id} = e.target;
		const fieldIndex = parseInt(id.charAt(id.length - 1));
		if (isNaN(fieldIndex)) {
			setValid(false);
			setForm({
				...form,
				doctor: {
					id: null,
					firstName: '',
					lastName: ''
				},
				fullName: ''
			});
			if (name === "specialization") {
				setForm({
					specialization: {
						id: null,
						name: ''
					},
					doctor: {
						id: null,
						firstName: '',
						lastName: ''
					},
					fullName: ''
				});
			}
			return;
		}
		if (name === "specialization") {
			field = {...specializations[fieldIndex]}
		} else if (name === "doctor") {
			field = {...doctors[fieldIndex]}
			setValid(true);
		}

		setForm({
			...form,
			[name]:{
				...form[name],
				...field
			},
			fullName: (name === "doctor" ? value : '')
		});
	}

	return (
		<>
			<Paper elevation={5} sx={{width: '100%', padding: 4}}>
				<Grid container spacing={4}>
					<Grid item md={12} sx={{display: 'flex', justifyContent: 'center'}}>
						<Autocomplete
							id="specialization"
							value={form.specialization.name}
							options={specializations.map((spec) => spec.name)}
							sx={{width: '50%'}}
							onChange={(e, newValue) => handleChange(e, newValue, "specialization")}
							renderInput={(params) => <TextField {...params} label="Specialization"/>}
						/>
					</Grid>
					<Grid item md={12} sx={{display: 'flex', justifyContent: 'center'}}>
						<Autocomplete
							id="doctor"
							value={form.fullName}
							disabled={form.specialization.name === ''}
							options={doctors.map((doctor) => doctor.firstName + " " + doctor.lastName)}
							sx={{width: '50%'}}
							onChange={(e, newValue) => handleChange(e, newValue, "doctor")}
							renderInput={(params) => <TextField {...params} label="Doctor"/>}
						/>
					</Grid>
				</Grid>
				
			</Paper>
			<Box sx={{mt: 4, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
				<Button
					variant="contained"
					onClick={() => {
						console.log(form);
						doctor.id = form.doctor.id;
						doctor.firstName = form.doctor.firstName;
						doctor.lastName = form.doctor.lastName;
						doctor.specialization.id = form.specialization.id;
						doctor.specialization.name = form.specialization.name;
						handlePrevious();
					}}>
					Previous
				</Button>
				<Button
					variant="contained"
					disabled={!valid}
					onClick={() => {
						console.log(form);
						doctor.id = form.doctor.id;
						doctor.firstName = form.doctor.firstName;
						doctor.lastName = form.doctor.lastName;
						doctor.specialization.id = form.specialization.id;
						doctor.specialization.name = form.specialization.name;
						handleNext();
					}}>
					Next Step
				</Button>
			</Box>
		</>
	);

}

export default DoctorSelect;