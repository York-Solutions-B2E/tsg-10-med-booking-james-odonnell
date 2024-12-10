import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import {useAppContext} from '../../../App';

const DoctorTable = ({doctors, handleDelete}) => {

	const {navigate} = useAppContext();

	const paginationModel = {page: 0, pageSize: 25};
  const sortingModel = {field: 'id', sorct: 'desc'};
  const columns = [
    {field: 'id', headerName: 'ID', minWidth: 100},
    {field: 'doctor', headerName: 'Doctor', minWidth: 150},
    {field: 'specialization', headerName: 'Specialization', minWidth: 150},
    {field: 'status', headerName: 'Status', minWidth: 120},
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 240,
      flexGrow: 1,
      renderCell: ((params) => (
        params.row.status === 'INACTIVE' ? null :
      	<>
      		<Button
      			onClick={() => navigate(`/admin/doctors/${params.row.index}`)}>
      			view
      		</Button>
      		<Button
      			onClick={() => navigate(`/admin/doctors/${params.row.index}/edit`)}>
      			edit
      		</Button>
      		<Button
            color="error"
      			onClick={() => handleDelete(params.row.index)}>
      			delete
      		</Button>
      	</>
      ))
    },
  ];

	return (
		<Paper elevation={5} sx={{height: 630, width: '100%'}}>
			<DataGrid
				disableRowSelectionOnClick
				columns={columns}
				initialState={{
          pagination: {paginationModel},
          sorting: {
            sortModel: [sortingModel],
          }
        }}
        pageSizeOptions={[10, 25]}
        rows={doctors.map((doctor, index) => {
        	return {
        		index: index,
        		id: doctor.id,
        		doctor: `${doctor.firstName} ${doctor.lastName}`,
        		specialization: doctor.specialization.name,
            status: doctor.status,
        	}
        })}
			/>
		</Paper>
	);

}

export default DoctorTable;