import React, { useEffect } from 'react';
import './App.css';
import '@fontsource/inter';
import Navigation from './Navigation/Navigation.js';
import MenuContainer from './Menu/MenuContainer/MenuContainer.js';
import { useSelector } from 'react-redux';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

function App() {

  const userId = useSelector((state) => state.user.userId)

  return (

  <CssVarsProvider>
    <Sheet 
      variant="solid"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#1E2938'
      }}
    >
    <div>

        {
          userId ? 
          <Navigation />:
          <MenuContainer />
        }

      </div>
    </Sheet>
  </CssVarsProvider>
  );
}

export default App;
