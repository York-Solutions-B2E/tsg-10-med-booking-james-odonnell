import {useState, createContext, useContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AuthenticationAPI from './API/AuthenticationAPI';

import NavBar from './components/NavBar';
import Booking from './pages/Booking';
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

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user != null)
      return;
    (async () => {
      const response = await AuthenticationAPI.authenticate();
      setUser(response);
    })();
  }, [user])

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
      <AppContext.Provider value={user}>

        <ThemeContext.Provider value={[theme, switchTheme]}>
          <NavBar />
        </ThemeContext.Provider>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {user != null && !user.admin ? null :(
              <>
                <Route path="/booking" element={<Booking />} />
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
