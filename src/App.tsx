import { MantineProvider, createTheme } from '@mantine/core';
import { useCookies } from 'react-cookie';
import { Provider as JotaiProvider } from './components/ui/provider';
import { Provider as ReduxProvider  } from 'react-redux';
import { store } from './pages/new-workout/store';
import { ModalsProvider } from '@mantine/modals';
import { LoginModal } from './pages/auth/Login';
import { SigninModal } from './pages/auth/Signin';
import RoutesOfPages from './routes';
import NavBar from './components/NavBar';
import NavFooter from './components/NavFooter';
import Authentication from './pages/auth/Authentication';

const theme = createTheme({
});

function App() {
  const [ cookies ] = useCookies(['PublicKey']);

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider modals={{ login: LoginModal, signin: SigninModal }}>
        <JotaiProvider>
          <ReduxProvider store={store}>
              <div className='mx-4'>
                {
                  cookies.PublicKey ?
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
