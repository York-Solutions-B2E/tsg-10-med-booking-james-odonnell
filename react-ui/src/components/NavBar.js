import {useState} from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import {useAppContext, useThemeContext} from '../App';

const NavBar = () => {

	const {admin, auth, setAuth} = useAppContext();
	const [theme, switchTheme] = useThemeContext();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	return (
		<Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
        	
          <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
        		<Button component={Link} to="/appointments" color="inherit">Appointments</Button>
        		<Button component={Link} to="/doctors" color="inherit">Doctors</Button>
        		<Button component={Link} to="/patients" color="inherit">Patients</Button>
          </Box>

          <IconButton onClick={switchTheme} sx={{width: 48, height: 48}}>
          	{theme.palette.mode === 'light' ?
          		<DarkModeIcon /> :
          		<LightModeIcon />
          	}
          </IconButton>

        	<AccountCircle
        		sx={{width: 40, height: 40}}
        		onClick={(event) => setAnchorEl(event.currentTarget)} />

        	<Menu
        		id="basic-menu"
        		anchorEl={anchorEl}
        		onClose={() => setAnchorEl(null)}
        		open={open}>
        		{auth ?
        			<MenuItem onClick={() => setAnchorEl(null)}
        			component={Link} to="/appointments"
        			>My Appointments</MenuItem> : null}
        		<MenuItem onClick={() => {
        			setAnchorEl(null);
        			setAuth(!auth);
        		}}>{auth ?
	        		<Typography>Logout</Typography> :
	        		<Typography>Login</Typography>}
        		</MenuItem>
        	</Menu>

        </Toolbar>
      </AppBar>
    </Box>
	);
}

export default NavBar;