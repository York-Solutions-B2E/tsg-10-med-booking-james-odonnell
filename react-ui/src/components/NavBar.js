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

import AuthenticationAPI from '../API/AuthenticationAPI';
import {useAppContext, useThemeContext} from '../App';

const NavBar = () => {

	const user = useAppContext();
	const [theme, switchTheme] = useThemeContext();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	return (
		<Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
        	
          <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
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

					{user != null ?
	        	<Menu
	        		id="basic-menu"
	        		anchorEl={anchorEl}
	        		onClose={() => setAnchorEl(null)}
	        		open={open}>
        				<MenuItem
        					onClick={() => setAnchorEl(null)}
        					component={Link} to="/appointments"><Typography>My Appointments</Typography></MenuItem>
        				<MenuItem
        					onClick={() => {AuthenticationAPI.logout()}}><Typography>Logout</Typography></MenuItem>
        			</Menu> :
        		<Menu
	        		id="basic-menu"
	        		anchorEl={anchorEl}
	        		onClose={() => setAnchorEl(null)}
	        		open={open}>
        			<MenuItem onClick={() => {AuthenticationAPI.login()}}><Typography>Login</Typography></MenuItem>
        		</Menu>}

        </Toolbar>
      </AppBar>
    </Box>
	);
}

export default NavBar;