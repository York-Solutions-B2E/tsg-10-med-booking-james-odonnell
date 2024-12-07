import {useState} from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import AuthenticationAPI from '../API/AuthenticationAPI';
import {useAppContext, useThemeContext} from '../App';

const NavBar = () => {

	const {user, admin} = useAppContext();
	const [theme, switchTheme] = useThemeContext();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	return (

		<Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
        	
        	<Typography variant="h5">York Medical<Link to="/" /></Typography>
          <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
          	<Paper elevation={4}>
          		{!user || !admin ?
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
          				component={Link} to="/admin"
          				color="inherit"
          				variant="contained">
          				Manage doctors
          			</Button>
          		}
          	</Paper>
          </Box>

          <IconButton onClick={switchTheme} sx={{width: 48, height: 48}}>
          	{theme.palette.mode === 'light' ?
          		<DarkModeIcon /> :
          		<LightModeIcon />
          	}
          </IconButton>

          {user ?
	        	<AccountCircle
	        		sx={{width: 40, height: 40}}
	        		onClick={(event) => setAnchorEl(event.currentTarget)}
	        	/> :
	        	<Button color="inherit" onClick={() => {AuthenticationAPI.login()}}>Login</Button>
	        }

					{user ?
	        	<Menu
	        		anchorEl={anchorEl}
	        		onClose={() => setAnchorEl(null)}
	        		open={open}>
        				<MenuItem
        					onClick={() => setAnchorEl(null)}
        					component={Link} to="/appointments">My Appointments
        				</MenuItem>
        				<MenuItem
        					onClick={() => setAnchorEl(null)}
        					component={Link} to="/booking">Booking
        				</MenuItem>
        				<MenuItem
        					onClick={() => {AuthenticationAPI.logout()}}>Logout
      					</MenuItem>
        			</Menu> :
        		<Menu
	        		anchorEl={anchorEl}
	        		onClose={() => setAnchorEl(null)}
	        		open={open}>
        			<MenuItem onClick={() => {AuthenticationAPI.login()}}>Login</MenuItem>
        		</Menu>
        	}

        </Toolbar>
      </AppBar>
    </Box>
	);
}

export default NavBar;