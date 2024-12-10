import {useState} from 'react';

import Container from '@mui/material/Container';

import {useAppContext} from '../../App';
import {useAdminContext} from './AdminContext';
import DataAPI from '../../API/DataAPI';
import DoctorTable from './components/DoctorTable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Modal from '../../components/Modal';

const DoctorList = () => {

	const {navigate} = useAppContext();
	const {doctors} = useAdminContext();
	const [modalOpen, setModalOpen] = useState(false);
	const [doctor, setDoctor] = useState({
		firstName: '',
		lastName: '',
		specialization: {
			name: ''
		}
	});

	const handleDelete = (index) => {
		if (index < 0 || index >= doctors.length || isNaN(index))
			return;
		setDoctor(doctors[index]);
		setModalOpen(true);
	}

	const handleConfirm = async () => {
		console.log(doctor);
    await DataAPI.delete(
      "doctors", {
      	"content-type": "application/json",
    		"doctorId": doctor.id
    	},
      JSON.stringify(doctor)
    );

    doctor.status = 'INACTIVE';
    setDoctor({
    	...doctor,
    	status: 'INACTIVE',
    });
    setModalOpen(false);
	}

	return (
		<Container sx={{mt: 4}}>
			<DoctorTable doctors={doctors} handleDelete={handleDelete}/>
			<Modal
				open={modalOpen}
				setOpen={setModalOpen}
				title="Delete doctor"
				content={[{
					content:
						<p>
							First name: {doctor.firstName}<br />
							Last name: {doctor.lastName}<br />
							Specialization: {doctor.specialization.name}<br />
						</p>
				}]}
				actions={[{
					title: "cancel",
					action: (() => setModalOpen(false))
				}, {
					title: "confirm",
					action: handleConfirm
				}]}
				warning={<Typography color="red">Warning: this action cannot be undone.</Typography>}
			/>
			<Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center', mt: 4}}>
				<Button
					onClick={() => navigate("/admin/doctors/new")}
					variant="contained">
					new doctor
				</Button>
			</Box>
		</Container>
	);

}

export default DoctorList;