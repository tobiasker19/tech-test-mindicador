import { Request, Response } from 'express';
import { getUfValueByDate } from '../services/mindicador.service';

export const getUF = async (req: Request, res: Response) => {
    // La fecha viene como parámetro en la URL
    const { date } = req.params;

    try {
        const result = await getUfValueByDate(date);

        // Formatear el valor a moneda chilena
        const formattedValue = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 2,
        }).format(result.ufValue);

        // Formateo mensaje: El valor de la UF para la fecha dd-mm-yyyy es $X.XXX,XX
        const message = `El valor de la UF para la fecha ${result.date.replace(/-/g, '/')} es ${formattedValue}`;

        res.status(200).json({
            message: message,
        });

    } catch (error) {
        // Manejo de errores (fecha futura, fecha sin datos, etc)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (errorMessage.includes('future') || errorMessage.includes('required')) {
            return res.status(400).json({ message: errorMessage });
        }

        if (errorMessage.includes('No data found')) {
            return res.status(404).json({ message: errorMessage });
        }

        // Cualquier otro error
        res.status(500).json({ message: 'Internal server error' });
    }
};

