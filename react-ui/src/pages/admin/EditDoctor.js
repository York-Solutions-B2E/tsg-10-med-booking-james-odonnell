import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {useAppContext} from '../../App';
import {useAdminContext} from './AdminContext';
import DataAPI from '../../API/DataAPI';
import {validateName} from '../../util/Validate';
import Modal from '../../components/Modal';
import DoctorForm from './components/DoctorForm';

const EditDoctor = () => {

	const {index} = useParams();
	const {navigate} = useAppContext();
	const {doctors, setDoctors} = useAdminContext();
	const [doctor, setDoctor] = useState(doctors[index]);
	const [specializations, setSpecializations] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [valid, setValid] = useState(false);
	const [form, setForm] = useState({
		firstName: {
			value: doctor.firstName,
			error: false
		},
		lastName: {
			value: doctor.lastName,
			error: false
		},
		specialization: {
			value: {
				id: doctor.specialization.id,
				name: doctor.specialization.name
			},
			error: false
		}
	});

	useEffect(() => {
		if (specializations !== null)
			return;

		(async () => {
			const data = await DataAPI.get("specializations", {});
			if (data !== '')
				setSpecializations(data);
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

		const response = await DataAPI.put("doctors", {"content-type": "application/json"}, JSON.stringify({
			id: doctor.id,
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			specialization: form.specialization.value
		}));
		const updatedDoctor = await JSON.parse(response);
		doctors.push(updatedDoctor);
		setDoctors(doctors.filter((doc, i) => i != index));
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
				title="Update doctor"
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
					onClick={() => navigate("/admin/doctors")}
					variant="contained">
					cancel
				</Button>
				<Button
					variant="contained"
					disabled={!valid}
					onClick={(e) => setModalOpen(true)} >
					submit
				</Button>
			</Box>
		</Container>
	);

}

export default EditDoctor;