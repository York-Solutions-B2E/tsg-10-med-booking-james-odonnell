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

const ManageDoctor = () => {

	const {index} = useParams();
	const {navigate} = useAppContext();
	const {doctors, setDoctors} = useAdminContext();
	const [doctor] = useState(index !== undefined ? (doctors[index]) : null);
	const [specializations, setSpecializations] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [valid, setValid] = useState(false);
	const [form, setForm] = useState({
		firstName: {
			value: doctor !== null ? doctor.firstName : '',
			error: false
		},
		lastName: {
			value: doctor !== null ? doctor.lastName : '',
			error: false
		},
		specialization: {
			value: {
				id: doctor !== null ? doctor.specialization.id : null,
				name: doctor !== null ? doctor.specialization.name : '',
			},
			error: false
		},
		valid: doctor !== null,
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

	const handleChange = (value, field, id) => {
		let obj = value;
		if (field === "specialization") {
			if (id !== undefined) {
				const specIndex = parseInt(id.charAt(id.length - 1));
				if (!isNaN(specIndex) && specIndex >= 0 && specIndex < specializations.length) {
					obj = specializations[specIndex];
				} else {
					obj = {
						id: null,
						name: '',
					}
				}
			} else {
				obj = {
					id: null,
					name: '',
				}
			}
		}

		const tempForm = {
			...form,
			[field]: {
				value: obj,
				error: value === null || !validateName(value)
			}
		}

		setForm({
			...tempForm,
			valid:
				tempForm.firstName.value !== '' &&
				tempForm.lastName.value !== '' &&
				tempForm.specialization.value.id !== null &&
				!tempForm.firstName.error &&
				!tempForm.lastName.error &&
				!tempForm.specialization.error,
		});
	}

	const handleSubmit = async () => {

		let doc = {
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			specialization: form.specialization.value
		}
		let method = "POST";
		if (doctor !== null) {
			method = "PUT";
			doc.id = doctor.id;
		}

		const response = await DataAPI.requestAsAdmin(
				"doctors", method, {
					"content-type": "application/json",
					doctorId: (doctor !== null ? doc.id : null),
				},
				JSON.stringify(doc)
		);

		if (response === null) {
			setModalOpen(false);
			navigate("/admin/doctors");
			return;
		}

		const updatedDoctor = await JSON.parse(response);

		if (index !== undefined)
			doctors[index] = updatedDoctor;
		else
			doctors.push(updatedDoctor);

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
					disabled: !form.valid,
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
					disabled={!form.valid}
					onClick={(e) => setModalOpen(true)} >
					submit
				</Button>
			</Box>
		</Container>
	);

}

export default ManageDoctor;