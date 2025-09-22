import { AxiosResponse } from 'axios';
import clientAxios from './axios';
import { IUser } from '../model/IUser';

export const getTurnosDisponibles = async ({day}: {day: string}): Promise<any> => {
    try {        
        const response: AxiosResponse<any, any> = await clientAxios.get('admin/turnosDisponibles',{params: {day}});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getMascotas = async (user:number): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('client/mascotas/'+user);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createClient = async (user:IUser): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.post('client', user);
        return response.data;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}

export const createMascota = async (mascota: any): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.post('client/mascotas', mascota);
        return response.data;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}