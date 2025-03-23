import React from 'react';
import NavBar from './components/NavBar';
import { MantineProvider, createTheme } from '@mantine/core';
import { Provider } from './components/ui/provider';
import RoutesOfPages from './routes';
import NavFooter from './components/NavFooter';
const theme = createTheme({
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider>
        <div className='mx-4'>
          <NavBar />
          <RoutesOfPages />
          <NavFooter />
        </div>
      </Provider>
    </MantineProvider>
  );
}

export default App;
