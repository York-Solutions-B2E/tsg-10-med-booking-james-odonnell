import {useState, createContext, useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import NavBar from './components/NavBar';
import Home from './pages/Home';

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const AppContext = createContext();
export const useAppContext = () => {
  return useContext(AppContext);
}

const App = () => {

  const [admin, setAdmin] = useState(false);
  const [auth, setAuth] = useState(false);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={[admin, setAdmin, auth, setAuth]}>
          <CssBaseline />

          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>

        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
