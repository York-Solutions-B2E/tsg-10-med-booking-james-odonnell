import {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import DataAPI from '../../../API/DataAPI';

const DoctorSelect = ({form, setForm}) => {

	const [specializations, setSpecializations] = useState([]);
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		(async () => {
			const specs = await DataAPI.request("specializations", "GET");
			if (specs != null)
				setSpecializations(JSON.parse(specs));
			if (form.specialization.id != null) {
				const docs = await DataAPI.request(
						"doctors/specialization", "GET", {
						specializationId: form.specialization.id
				});
				setDoctors(JSON.parse(docs));
			}
		})();
	}, [form]);

	const handleChange = (id, value, field) => {
		if (field !== "specialization" && field !== "doctor") {
			console.log("Error: not a valid object field");
			return;
		}

		const fieldIndex = parseInt(id.charAt(id.length - 1));
		let valid = value !== null;
		let obj;
		if (id !== "" && !isNaN(fieldIndex)) {
			if (field === "specialization") {
				obj = {...specializations[fieldIndex]};
			} else if (field === "doctor") {
				obj = {...doctors[fieldIndex]};
			}
		} else {
			obj = null;
		}
		setForm({
			doctor: (field === "doctor" && obj != null ? obj : {
				id: null,
				firstName: '',
				lastName: '',
			}),
			specialization: (field === "specialization" ? (obj !== null ?
				obj : {
					id: null,
					name: '',
				}
			) : form.specialization),
			fullName: (field === "doctor" ? value : ''),
			valid: (valid && field === "doctor" ? true : false),
		});
	}

	return (
		<>
			<Paper elevation={5} sx={{width: '100%', padding: 4}}>
				<Grid container spacing={4}>
					<Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
						<Autocomplete
							id="specialization"
							value={form.specialization.name}
							options={specializations.map((spec) => spec.name)}
							sx={{width: '50%'}}
							onChange={(e, newValue) => handleChange(e.target.id, newValue, "specialization")}
							renderInput={(params) => <TextField {...params} label="Specialization"/>}
						/>
					</Grid>
					<Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
						<Autocomplete
							id="doctor"
							value={form.fullName}
							disabled={form.specialization.name === ''}
							options={doctors.map((doctor) => doctor.firstName + " " + doctor.lastName)}
							sx={{width: '50%'}}
							onChange={(e, newValue) => handleChange(e.target.id, newValue, "doctor")}
							renderInput={(params) => <TextField {...params} label="Doctor"/>}
						/>
					</Grid>
				</Grid>
				
			</Paper>
		</>
	);

}

export default DoctorSelect;