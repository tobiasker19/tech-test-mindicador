import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import dayjs, { Dayjs } from 'dayjs';

// Imports de MUI
import {
    Container,
    Box,
    Button,
    Typography,
    Alert,
    IconButton, 
    Tooltip,
    Paper 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LogoutIcon from '@mui/icons-material/Logout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ConsultaUFPage = () => {
    // Estados
    const [fecha, setFecha] = useState<Dayjs | null>(null);
    const [resultado, setResultado] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();

    // Función del botón "Consultar UF"
    const handleConsulta = async () => {
        setError(null);
        setResultado(null);

        // Validaciones
        if (!fecha) {
            setError('La fecha no puede estar vacía.');
            return;
        }
        const fechaFormateada = fecha.format('YYYY-MM-DD');
        const hoy = dayjs().format('YYYY-MM-DD');
        if (fechaFormateada > hoy) {
            setError('La fecha no puede ser futura.');
            return;
        }

        try {
            // Llamada a la API
            const response = await axios.get(`${API_URL}/api/uf/${fechaFormateada}`);
            setResultado(response.data.message);

        } catch (err) {
            // Manejo de errores
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Error al consultar la API.');
            } else {
                setError('Error de red o servidor no responde.');
            }
        }
    };

    return (
        // Contenedor principal centrado
        <Container 
            component="main" 
            maxWidth="sm" 
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Formulario */}
            <Paper
                elevation={6}
                sx={{
                    padding: { xs: 3, sm: 4 }, 
                    borderRadius: 4, 
                    width: '100%',
                    position: 'relative' 
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Tooltip title="Cerrar sesión">
                        <IconButton
                            onClick={logout}
                            sx={{ 
                                position: 'absolute', 
                                top: 16, 
                                right: 16,
                                color: '#000' 
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>

                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Consulta de Valor UF
                    </Typography>

                    {/* Date Picker */}
                    <DatePicker
                        label="Selecciona una fecha"
                        value={fecha}
                        onChange={(newValue) => setFecha(newValue)}
                        disableFuture
                        sx={{ width: '100%', mb: 2 }}
                    />
                    <Button 
                        variant="contained" 
                        fullWidth
                        color="primary"
                        onClick={handleConsulta}
                        sx={{ 
                            padding: '10px 0',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Consultar UF
                    </Button>

                    {/* Área de resultados */}
                    <Box sx={{ mt: 3, width: '100%' }}>
                        {resultado && (
                            <Alert severity="success" sx={{ fontSize: '1.1em' }}>
                                {resultado}
                            </Alert>
                        )}
                        {error && (
                            <Alert severity="error" sx={{ fontSize: '1.1em' }}>
                                {error}
                            </Alert>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};  

export default ConsultaUFPage;