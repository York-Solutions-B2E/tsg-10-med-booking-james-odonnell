import {useState, useEffect} from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {useAppContext} from '../../App';
import {useAdminContext} from './AdminContext';
import DataAPI from '../../API/DataAPI';
import {validateName} from '../../util/Validate';
import Modal from '../../components/Modal';
import DoctorForm from './components/DoctorForm';

const NewDoctor = () => {

	const {navigate} = useAppContext();
	const {doctors, setDoctors} = useAdminContext();
	const [specializations, setSpecializations] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [valid, setValid] = useState(false);
	const [form, setForm] = useState({
		firstName: {
			value: '',
			error: false
		},
		lastName: {
			value: '',
			error: false
		},
		specialization: {
			value: {
				id: null,
				name: ''
			},
			error: false
		}
	});

	useEffect(() => {
		if (specializations !== null)
			return;

		(async () => {
			const data = await DataAPI.request("specializations", "GET");
			if (data !== '')
				setSpecializations(JSON.parse(data));
		})();
	}, [specializations]);

	useEffect(() => {
		setValid(
			form.firstName.value !== '' &&
			form.lastName.value !== '' &&
			form.specialization.value.name !== '' &&
			form.specialization.value.id !== null &&
			!form.firstName.error &&
			!form.lastName.error &&
			!form.specialization.error
		);
	}, [form]);

	const handleChange = (value, field) => {
		if (field === "specialization") {
			const specIndex = parseInt(value.charAt(value.length - 1));
			setForm({
				...form,
				[field]: {
					"value": specializations[specIndex],
					error: isNaN(specIndex) || specIndex < 0 || specIndex >= specializations.length
				}
			})
			return;
		}
		setForm({
			...form,
			[field]: {
				"value": value,
				error: value === null || !validateName(value)
			}
		});
	}

	const handleSubmit = async () => {
		console.log({
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			specialization: form.specialization.value
		});

		const response = await DataAPI.requestAsAdmin(
				"doctors", "POST",
				{"content-type": "application/json"},
				JSON.stringify({
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			specialization: form.specialization.value
		}));
		const doctor = await JSON.parse(response);
		doctors.push(doctor);
		setDoctors(doctors);
		setModalOpen(false);
		navigate("/admin/doctors");
	}

	return (
		<Container sx={{mt: 4, width: '50%'}}>
			<Box sx={{display: 'flex', justifyContent: 'center'}}>
				<DoctorForm
					handleChange={handleChange}
					form={form}
					specializations={specializations}
				/>
			</Box>
			<Modal
				open={modalOpen}
				setOpen={setModalOpen}
				title="Add new doctor"
				content={[{
					content:
						<p>
							First name: {form.firstName.value}<br/>
							Last name: {form.lastName.value}<br/>
							Specialization: {form.specialization.value.name}<br/>
						</p>
				}]}
				actions={[{
					title: "cancel",
					disabled: false,
					action: (() => setModalOpen(false))
				}, {
					title: "submit",
					disabled: !valid,
					action: handleSubmit
				}]}
			/>
			<Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'space-between', mt: 4}}>
				<Button
					variant="contained">
					cancel
				</Button>
				<Button
					variant="contained"
					disabled={!valid}
					onClick={(e) => {
						console.log(e);
						setModalOpen(true);
					}} >
					submit
				</Button>
			</Box>
		</Container>
	);

}

export default NewDoctor;