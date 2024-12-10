import {useState} from 'react';

import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

import Modal from '../../../components/Modal';
import DataAPI from '../../../API/DataAPI';
import {useAppContext} from '../../../App';
import {useAppointmentContext} from '../AppointmentContext';

const AppointmentTable = () => {

  const {navigate} = useAppContext();
  const {appointments, setAppointments} = useAppointmentContext();
  const [open, setOpen] = useState(false);
  const [cancelApt, setCancelApt] = useState(null);

  const paginationModel = {page: 0, pageSize: 10};
  const columns = [
    {field: 'id', headerName: 'ID', minWidth: 100},
    {field: 'doctor', headerName: 'Doctor', minWidth: 150},
    {field: 'date', headerName: 'Date', minWidth: 100},
    {field: 'time', headerName: 'Time', minWidth: 100},
    {field: 'visitType', headerName: 'Visit Type', minWidth: 155},
    {field: 'status', headerName: 'Status', minWidth: 155},
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 160,
      flexGrow: 1,
      renderCell: ((params) => (
        <>
          <Button
            onClick={() => {
              navigate(`/myappointments/edit/${params.row.index}`);
            }}>
            Edit
          </Button>
          <Button
            onClick={() => {
              setCancelApt(params.value);
              setOpen(true);
            }}>
            Cancel
          </Button>
        </>
      ))
    },
  ];

  const cancel = async () => {
    cancelApt.status = 'CANCELLED';
    console.log(cancelApt);
    const response = await DataAPI.put(
      "appointments/update",
      {"content-type": "application/json"},
      JSON.stringify(cancelApt));
    if (response === '')
      return;

    setAppointments(appointments.filter((appt) => appt.id !== cancelApt.id));
    setOpen(false);
  }

	return (
		<Paper sx={{height: 630, width: '100%'}}>
      <DataGrid
        disableRowSelectionOnClick
        rows={appointments.map((appointment, index) => {
          return {
            index: index,
            id: appointment.id,
            doctor: `${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
            date: dayjs(appointment.dateTime).format("MM/DD"),
            time: dayjs(appointment.dateTime).format("hh:mm A"),
            visitType: appointment.visitType,
            status: appointment.status,
            actions: appointment
          }
        })}
        columns={columns}
        initialState={{pagination: {paginationModel}}}
        pageSizeOptions={[5, 10]}
        sx={{border: 0}}
        slots={{
          noRowsOverlay: (() => (
            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', height: '100%', p: 25}}>
              <Typography variant="h5">No appointments scheduled</Typography>
            </Box>
          ))
        }}
      />
      {cancelApt ?
        <Modal
          open={open}
          setOpen={setOpen}
          title="Are you sure you want to cancel this appointment?"
          warning={<Typography color="red">Warning: this action cannot be undone</Typography>}
          content={[{
            title: "Appointment details",
            content:
              <p>
                Doctor: {cancelApt.doctor.firstName} {cancelApt.doctor.lastName} <br/>
                Date: {dayjs(cancelApt.dateTime).format("MM/DD")} <br/>
                Time: {dayjs(cancelApt.dateTime).format("hh:mm A")} <br/>
                Visit type: {cancelApt.visitType}
              </p>
          }]}
          actions={[{
            title: "No",
            action: (() => setOpen(false))
          }, {
            title: "Yes",
            action: (() => cancel())
          }]}
        /> : null
      }
    </Paper>
	);

}

export default AppointmentTable;