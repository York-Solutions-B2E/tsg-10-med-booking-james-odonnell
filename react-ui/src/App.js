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
  let effect = false;

  useEffect(() => {
    if (effect) //useEffect gets called twice in dev mode, so this makes it only call once
      return;
    effect = true;
    (async () => {
      const response = await AuthenticationAPI.authenticate();
      setUser(response);
    })();
  }, [setUser])

  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        mode: 'dark',
      }
    })
  );

  const switchTheme = () => {
    let mode = 'light';
    if (theme.palette.mode === 'light')
      mode = 'dark';
    setTheme(createTheme({
      palette: {
        mode: mode
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
          <Routes> {user != null ? (
            <Route path="/booking" element={<Booking />} />) : null}
            <Route path="/*" element={<Home />} />
          </Routes>
        </ThemeProvider>

      </AppContext.Provider>
    </div>
  );
}

export default App;
