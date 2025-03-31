import React from 'react';
import NavBar from './components/NavBar';
import { MantineProvider, createTheme } from '@mantine/core';
import { Provider as JotaiProvider } from './components/ui/provider';
import { Provider as ReduxProvider  } from 'react-redux';
import RoutesOfPages from './routes';
import NavFooter from './components/NavFooter';
import { store } from './pages/new-workout/store';
const theme = createTheme({
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <JotaiProvider>
        <ReduxProvider store={store}>
          <div className='mx-4'>
            <NavBar />
            <RoutesOfPages />
            <NavFooter />
          </div>
        </ReduxProvider>
      </JotaiProvider>
    </MantineProvider>
  );
}

export default App;
