import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const DoctorForm = ({form, handleChange, specializations}) => {

	if (form === null || specializations === null)
		return;

	return (
		<Paper elevation={5} sx={{width: '100%', p: 4}}>
			<Grid container sx={{width: '100%'}} spacing={4}>
				<Grid item xs={12} md={6}>
					<TextField
						sx={{width: '100%'}}
						required
						label="First name"
						value={form.firstName.value}
						error={form.firstName.error}
						onChange={(e) => handleChange(e.target.value, "firstName")}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						sx={{width: '100%'}}
						required
						label="Last name"
						value={form.lastName.value}
						error={form.lastName.error}
						onChange={(e) => handleChange(e.target.value, "lastName")}
					/>
				</Grid>
				<Grid item xs={12}>
					<Autocomplete
						id="specialization"
						sx={{width: '100%'}}
						value={form.specialization.value.name}
						options={specializations.map((spec) => spec.name)}
						onChange={(e, newValue) => {handleChange(newValue, "specialization", e.target.id)}}
						renderInput={(params) =>
							<TextField {...params}
								required
								error={form.specialization.error}
								label="Specialization"
							/>
						}
					/>
				</Grid>
			</Grid>
		</Paper>
	);

}

export default DoctorForm;