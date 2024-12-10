import {Link} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import AuthenticationAPI from '../API/AuthenticationAPI';
import {useAppContext, useThemeContext} from '../App';

const NavBar = () => {

	const {admin} = useAppContext();
	const [theme, switchTheme] = useThemeContext();

	return (

		<Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>

      		<Typography
        		variant="h5">
        		York Medical
        	</Typography>

          <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
          	<Paper elevation={4}>
          		{!admin ?
          			<ButtonGroup>
        					<Button
	          				component={Link} to="/booking"
	          				color="inherit"
	          				variant="contained">
	          				Book an appointment
	          			</Button>
	          			<Button
	          				component={Link} to="/"
	          				color="inherit"
	          				variant="contained">
	          				Home
	          			</Button>
	          			<Button
	          				component={Link} to="/myappointments/list"
	          				color="inherit"
	          				variant="contained">
	          				My appointments
	          			</Button>
        				</ButtonGroup> :
        				<Button
          				component={Link} to="/admin/doctors"
          				color="inherit"
          				variant="contained">
          				Manage doctors
          			</Button>
          		}
          	</Paper>
          </Box>

          <IconButton onClick={switchTheme} sx={{width: 48, height: 48}}>
          	{theme.palette.mode === 'light' ?
          		<DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {admin ? <Button color="inherit" onClick={() => {AuthenticationAPI.logout()}}>Logout</Button>
	        	: <Button color="inherit" onClick={() => {AuthenticationAPI.login()}}>Login</Button>}
	        

        </Toolbar>
      </AppBar>
    </Box>
	);
}

export default NavBar;