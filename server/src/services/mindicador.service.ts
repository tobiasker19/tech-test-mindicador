import https from 'https';
import axios from 'axios';
import express = require('express');

// Función para formatear la fecha a 'dd-mm-yyyy'
const formatDate = (date: string): string => {
    const [year, month, day] = date.split('-');
    // Fecha vieja en formato 'yyyy-mm-dd''
    return `${day}-${month}-${year}`;
};

export const getUfValueByDate = async (date: string) => {
    // Validar que la fecha no este vacía y no sea futura 
    if (!date) {
        throw new Error('Date is required');
    }

    const today = new Date().toISOString().split('T')[0];

    if (date > today) {
        throw new Error('Date cannot be in the future');
    }

    // Formatear la fecha a 'dd-mm-yyyy'
    const formattedDate = formatDate(date);
    const url = `https://mindicador.cl/api/uf/${formattedDate}`;

    const httpsAgent = new https.Agent({
        minVersion: 'TLSv1.2',
        keepAlive: true,
    });

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
            },
            httpsAgent: httpsAgent,
        });

        // Manejo de error si la API responde pero no trae datos para esa fecha
        if (!response.data || !response.data.serie || response.data.serie.length === 0) {
            throw new Error(`No data found for the given date ${formattedDate}`);
        }

        const ufValue = response.data.serie[0].valor;
        return {
            date: formattedDate,
            ufValue: ufValue,
        };
    } catch (error) {
        // Manejo errores de Axios o de la API externa
        
        // Si el error es uno lanzado por nosotros
        if (error instanceof Error && error.message.startsWith('No data found')) {
            throw error;
        }

        // Si es un error de Axios
        if (axios.isAxiosError(error)) {
            console.error('Axios error fetching UF data:', error.message);
            throw new Error('Error connecting to external API');
        }   

        // Cualquier otro error inesperado
        console.error('Unexpected error fetching UF data:', error);
        throw error;
    }
};

