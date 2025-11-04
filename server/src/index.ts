import dotenv from 'dotenv';
dotenv.config();

import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import ufRoutes from './routes/uf.routes';

const app = express();

// Middlewares
app.use(cors()); //Peticiones del frontend
app.use(express.json()); //Parseo de JSON

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Backend working correctly');  
});

// Rutas de la API
app.use('/auth', authRoutes);
app.use('/api/uf', ufRoutes);

//Inciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
