import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Decirle a TypeScript que datos se esperan después de decodificar el token
interface JwtPayload {
    username: string;
}

// Extender el tipo 'Request' de Express para incluir la propiedad 'user'
export interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export const protect = (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    // Revisar si el token viene en el header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del header
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token usando el secreto del .env
            const jwtSecret = process.env.JWT_SECRET;
            const decoded = jwt.verify(token, jwtSecret!) as JwtPayload;

            // Agregar la información del usuario decodificado al objeto request para que las rutas protegidas sepan quién es el usuario
            req.user = decoded;

            // Si todo está OK, pasar al siguiente middleware o ruta
            next();
        } catch (error) {
            console.error('Error verifying token:', error);
            res.status(401).json({
                message: 'Not authorized, token is invalid or has expired'
            });
        }   
    }

    if (!token) {
        res.status(401).json({
            message: 'Not authorized, token not found'
        });
    }
};
