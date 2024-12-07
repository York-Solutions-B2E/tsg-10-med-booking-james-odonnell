import {useState, createContext, useContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useNavigate} from 'react-router-dom';

import AuthenticationAPI from './API/AuthenticationAPI';

import NavBar from './components/NavBar';
import Booking from './pages/Booking';
import AppointmentRouter from './pages/appointments/AppointmentRouter';
import Home from './pages/Home';

const ThemeContext = createContext();
export const useThemeContext = () => {
  return useContext(ThemeContext);
}

const AppContext = createContext();
export const useAppContext = () => {
  return useContext(AppContext);
}

const App = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await AuthenticationAPI.authenticate();
      if (response !== null) {
        setUser(true);
        if (response.admin)
          setAdmin(true);
      }
    })();
  }, []);

  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        mode: 'dark',
      }
    })
  );

  const switchTheme = () => {
    setTheme(createTheme({
      palette: {
        mode: theme.palette.mode === 'light' ? 'dark': 'light'
      }
    }))
  }

  return (
    <div className="App">
      <AppContext.Provider value={{navigate, user, admin, userEmail, setUserEmail}}>

        <ThemeContext.Provider value={[theme, switchTheme]}>
          <NavBar />
        </ThemeContext.Provider>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {user !== false && !admin ? null :(
              <>
                <Route path="/booking" element={<Booking />} />
                <Route path="/myappointments/*" element={<AppointmentRouter />} />
              </>
            )}
            <Route path="/*" element={<Home />} />
          </Routes>
        </ThemeProvider>

      </AppContext.Provider>
    </div>
  );
}

export default App;
