import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const DoctorSelectForm = ({form, specializations, doctors, handleChange}) => {

	return (
		<Grid container spacing={4} >
			<Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
				<Autocomplete
					id="specialization"
					value={form.specialization.name}
					options={specializations.map((spec) => spec.name)}
					sx={{width: '50%'}}
					onChange={(e, newValue) => handleChange(newValue, "specialization", e.target.id)}
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
					onChange={(e, newValue) => handleChange(newValue, "doctor", e.target.id)}
					renderInput={(params) => <TextField {...params} label="Doctor"/>}
				/>
			</Grid>
		</Grid>
	);

}

export default DoctorSelectForm;