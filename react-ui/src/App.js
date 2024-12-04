import {useState, createContext, useContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
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

function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

const App = () => {

  const [admin, setAdmin] = useState(false);
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  let effect = false;

  useEffect(() => {

    if (effect) //useEffect gets called twice in dev mode, so this makes it only call once
      return;
    effect = true;

    fetch('api/auth', {credentials: 'include'})
      .then(response => response.text())
      .then(body => {
        if (body !== '') {
          console.log(JSON.parse(body));
          setAuth(true);
          setToken(getCookie('XSRF-TOKEN'));
        } else {
          setAuth(false);
        }
      }).catch(error => console.log(error));
    console.log('effect');
  }, [setAuth])

  const login = () => {
    let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000')
      port = ':8080';
    window.location.href = '//' + window.location.hostname + port + '/api/login';
  }

  const logout = () => {
    if (!auth)
      return;
    let cookie = getCookie('XSRF-TOKEN');
    console.log(cookie);
    fetch('api/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {'X-XSRF-TOKEN': cookie}
    }).then(response => response.json())
      .then(body => {
          console.log(body);
          window.location.href = body.logoutUrl + '?id_token_hint='+ body.idToken
            + '&post_logout_redirect_uri=' + window.location.origin;
      }).catch(error => {
        console.log(error);
      });
  }

  function getPermissions() {
    if (!auth)
      return;
    fetch('api/auth/permissions', {
      credentials: 'include'
    }).then(response => response.json())
      .then(body => console.log(body))
      .catch(error => console.log(error));
  }

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

          {auth ? <p>authorized</p> : <p>not authorized</p>}

          <button onClick={login}>Login</button>
          <button onClick={logout}>logout</button>
          <button onClick={() => console.log(getCookie('XSRF-TOKEN'))}>cookie</button>
          <button onClick={getPermissions}>permissions</button>

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
