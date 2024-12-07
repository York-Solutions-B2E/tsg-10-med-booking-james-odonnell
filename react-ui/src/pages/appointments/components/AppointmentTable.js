import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 100 },
  // { field: 'doctor', headerName: 'Doctor', minWidth: 100 },
  { field: 'date', headerName: 'Date', minWidth: 100},
  { field: 'time', headerName: 'Time', minWidth: 100},
  { field: 'visitType', headerName: 'Visit Type', minWidth: 155 },
  { field: 'fillGap', headerName: '', flex: 1},
  {
    field: 'actions',
    headerName: 'Actions',
    minWidth: 160,
    renderCell: ((params) => (
      <>
        <Button
          onClick={() => console.log(params.value)}>
          Edit
        </Button>
        <Button
          onClick={() => console.log(params.value)}>
          Cancel
        </Button>
      </>
    ))
  },
];

const paginationModel = { page: 0, pageSize: 10 };

const AppointmentTable = ({appointments}) => {

	return (
		<Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={appointments.map((appointment) => {
          return {
            id: appointment.id,
            date: dayjs(appointment.dateTime).format("MM/DD"),
            time: dayjs(appointment.dateTime).format("hh:mm A"),
            visitType: appointment.visitType,
            actions: appointment.id
          }
        })}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
	);

}

export default AppointmentTable;