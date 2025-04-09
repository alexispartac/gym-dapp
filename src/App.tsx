import { MantineProvider, createTheme } from '@mantine/core';
import { useCookies } from 'react-cookie';
import { Provider as JotaiProvider } from './components/ui/provider';
import { Provider as ReduxProvider  } from 'react-redux';
import { store } from './pages/new-workout/store';
import { ModalsProvider } from '@mantine/modals';
import { LoginModal } from './pages/auth/Login';
import { SigninModal } from './pages/auth/Signin';
import { ExpectedModal } from './pages/new-workout/WorkoutModals';
import RoutesOfPages from './routes';
import NavBar from './components/NavBar';
import NavFooter from './components/NavFooter';
import Authentication from './pages/auth/Authentication';
import React from 'react';
import { CheckBalance } from './pages/solana/check-balance';
import { useUser } from './context/UserContext';

const theme = createTheme({
});

// todo - cand dau refresh la pagina sa ma duca la pagina principala

function App() {
  const [ cookies ] = useCookies(['PublicKey', 'login']);
  const { setBalance, user } = useUser();
  console.log(user, 'user-page-app');

  React.useEffect(() => {
    if (cookies.PublicKey) {
      CheckBalance({ pubkey: cookies.PublicKey.public_key }).then((balance: number) => {
        setBalance(balance);
      }).catch(() => alert('Connect to the internet!'));
    }
  }, [cookies.PublicKey, setBalance])
  


  return (
    <MantineProvider theme={theme}>
      <ModalsProvider modals={{ login: LoginModal, signin: SigninModal, expected: ExpectedModal }} labels={{ confirm: 'Confirm', cancel: 'Cancel' }}>
        <JotaiProvider>
          <ReduxProvider store={store}>
              <div className='mx-4'>
                {
                  cookies.login ?
                    <>
                      <NavBar />
                      <RoutesOfPages />
                      <NavFooter />
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
