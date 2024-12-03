import {useState, createContext, useContext} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Appointments from './pages/Appointments';

const ThemeContext = createContext();
export const useThemeContext = () => {
  return useContext(ThemeContext);
}

const AppContext = createContext();
export const useAppContext = () => {
  return useContext(AppContext);
}

const App = () => {

  const [admin, setAdmin] = useState(false);
  const [auth, setAuth] = useState(false);

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
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{admin: admin, setAdmin: setAdmin, auth: auth, setAuth: setAuth}}>
          <CssBaseline />
          <ThemeContext.Provider value={[theme, switchTheme]}>
            <NavBar />
          </ThemeContext.Provider>

          <Switch onChange={() => setAdmin(!admin)}/>

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/appointments" element={<Appointments />}/>
          </Routes>

        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
