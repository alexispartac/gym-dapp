import { MantineProvider, createTheme } from '@mantine/core';
import { useCookies } from 'react-cookie';
import { Provider as JotaiProvider } from './components/ui/provider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './pages/new-workout/store';
import { ModalsProvider } from '@mantine/modals';
import { LoginModal } from './pages/auth/Login';
import { SigninModal } from './pages/auth/Signin';
import { ExpectedModal } from './pages/new-workout/WorkoutModals';
import RoutesOfPages from './routes';
import { SidebarDemo } from './components/NavBar';
import Authentication from './pages/auth/Authentication';
import React from 'react';
import { CheckBalance } from './pages/solana/check-balance';
import { useUser } from './context/UserContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const theme = createTheme({
  colors: {
    'gym-light': ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529', '#000000'],
    'gym-dark': ['#212529', '#343a40', '#495057', '#6c757d', '#adb5bd', '#ced4da', '#dee2e6', '#e9ecef', '#f8f9fa', '#ffffff'],
  },
});

const URL = 'http://127.0.0.1:8080/user/login';
function App() {
  const [cookies] = useCookies(['login']);
  const { setBalance, user, setUser } = useUser();

  React.useEffect(() => {
    if (cookies.login) {
      const jwt_token = cookies.login.jwt_token;
      const decoded = jwtDecode(jwt_token);
      const [username, password] = typeof decoded.sub === 'string' ? decoded.sub.split(':') : ['', ''];
      try {
        axios.post(URL, {
          username: username,
          password: password
        },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then((response) => {
          const user_data = (response.data as { user_data: any }).user_data;
          const userData = {
            userId: user_data.user_id,
            username: user_data.username,
            publicKey: user_data.public_key,
            password: user_data.password,
          };
          setUser({ userInfo: userData, isAuthenticated: true });
        }).catch(() => alert('Connect to the internet!'));
      } catch (error) {
        console.log(error);
      }
      CheckBalance({ pubkey: user.userInfo.publicKey }).then((balance: number) => {
        setBalance(balance);
      }).catch(() => alert('Connect to the internet!'));
    }
  }, [cookies.login, setBalance, setUser, user.userInfo.publicKey])

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider modals={{ login: LoginModal, signin: SigninModal, expected: ExpectedModal }} labels={{ confirm: 'Confirm', cancel: 'Cancel' }}>
        <JotaiProvider>
          <ReduxProvider store={store}>
            <div>
              {
                cookies.login ?
                  <>
                    <SidebarDemo >
                      <RoutesOfPages />
                    </SidebarDemo>
                  </> :
                  <Authentication />
              }
            </div>
          </ReduxProvider>
        </JotaiProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
