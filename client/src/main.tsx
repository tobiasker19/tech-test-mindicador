import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

// Importors de MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GlobalStyles } from '@mui/material';

// Tema básico
const purpleTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Habilita el Router */}
    <BrowserRouter>
      <AuthProvider>
        {/* Proveedor del tema MUI */}
        <ThemeProvider theme={purpleTheme}>
          {/* Proveedor para el Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <GlobalStyles styles={{ 
              body: { backgroundColor: '#f0e6ff' } 
            }} />
            <App />
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);