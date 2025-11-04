import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validar que el username y password existan
    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required' 
        });
    }

    // Validar credenciales (hardodeadas del test)
    if (username !== 'admin' || password !== '1234') {
        return res.status(401).json({
            message: 'Usuario y/o contraseña incorrecto/s' //Error 401: No autorizado
        });
    }

    // Obtener el secreto del JWT desde el .env
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET is not defined in .env');
        return res.status(500).json({
            message: 'Internal server error'
        });
    }   

    // Generar el token JWT con firma de nombre de usuario y expiración de 1 día
    const token = jwt.sign(
        { username: username },
        jwtSecret,
        { expiresIn: '1d' }
    );

    // Enviar respuesta exitosa con el token
    res.status(200).json({
        message: 'Login successful',
        token: token
    });
};

