import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Imports de MUI
import { 
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Paper,
    Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {
    // Estado para los campos del formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Hook de navegación
    const auth = useAuth();
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null); // Resetear error previo

        // Validación simple de fronted
        if (!username || !password) {
            setError('Por favor, ingresa usuario y contraseña.');
            return;
        }
        try {
            // Llamada a la función de inicio de sesión
            await auth.login(username, password);
            // Redirigir a la página principal tras el login exitoso
            navigate('/');
        } catch (err) {
            // Manejo de errores
            setError((err instanceof Error) ? err.message : 'Error desconocido durante el inicio de sesión.');
        }
    };

    return (
        <Container
            component="main"
            maxWidth="lg"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >

            {/* Tarjeta que divide en dos */}
            <Paper
                elevation={6}
                sx={{
                    overflow: 'hidden',
                    borderRadius: 4,
                    maxWidth: 900,
                    width: '100%',
                    display: 'flex', 
                    minHeight: 550,
                }}
            >
                
                {/* Lado izquierdo (Panel Púrpura) */}
                <Box
                    sx={{
                        width: '50%',
                        display: { xs: 'none', sm: 'flex' },
                        backgroundImage: (theme) =>
                            `radial-gradient(
                                at 20% 30%, 
                                ${theme.palette.secondary.main} -10%, 
                                ${theme.palette.primary.main} 70%
                            )`,
                        color: 'white',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                    }}
                >

                    <Typography 
                        component="h1" 
                        variant="h4"  
                        sx={{ 
                            fontWeight: 'bold', 
                            textAlign: 'center' 
                        }}
                    >
                        Bienvenido a Mindicador
                    </Typography>

                    <Typography 
                        variant="h6" 
                        sx={{ 
                            mt: 2, 
                            textAlign: 'center',
                            fontWeight: 300 
                        }}
                    >
                        Consulta los valores de indicadores económicos de Chile de forma rápida y sencilla.
                    </Typography>
                </Box>

                {/* Lado derecho (Formulario) */}
                <Box
                    sx={{
                        width: { xs: '100%', sm: '50%' },
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Avatar sx={{ m:1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5" >
                        Iniciar Sesión
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id='username'
                            label='Usuario' 
                            name='username'
                            autoComplete='username'
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name='password'
                            label='Contraseña' 
                            type='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Mostrar mensaje de error si existe */}
                        {error && (
                            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Botón de envío */}
                        <Button 
                            type="submit" 
                            fullWidth variant="contained"
                            color="secondary"
                            sx={{
                                mt: 3,
                                mb: 2,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                padding: '10px 0'
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;