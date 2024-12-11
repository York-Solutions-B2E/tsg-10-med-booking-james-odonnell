import {validateName, validateEmail} from '../../util/Validate';
import PatientForm from './components/PatientForm';

const PatientInfo = ({form, setForm}) => {

	const handleChange = (value, name) => {
		let error = false;
		if (name === "firstName" || name === "lastName")
			error = !validateName(value);
		else if (name === "email")
			error = !validateEmail(value);

		form = {
			...form,
			[name]:{
				...form[name],
				value,
				error
			}
		};

		const valid =
			!form.firstName.error &&
			!form.lastName.error &&
			!form.email.error &&
			!form.dob.error &&
			form.firstName.value !== '' &&
			form.lastName.value !== '' &&
			form.email.value !== '' &&
			form.dob.value != null &&
			!error

		form.valid = valid;
		setForm(form);
	}

	return (
		<PatientForm form={form} handleChange={handleChange} />
	);

}

export default PatientInfo;