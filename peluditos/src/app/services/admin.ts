import { AxiosResponse } from 'axios';
import clientAxios from './axios';
import { IUser } from '../model/IUser';

export const getRazas = async (): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('admin/razas');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getTurnosDisponibles = async ({day}: {day: string}): Promise<any> => {
    try {        
        const response: AxiosResponse<any, any> = await clientAxios.get('turnos/turnosDisponibles',{params: {day}});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const IsDiaNoDisponible = async (day: Date): Promise<any> => {
    try {        
        const response: AxiosResponse<any, any> = await clientAxios.get('turnos/diasNoDisponibles',{params: {day}});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}