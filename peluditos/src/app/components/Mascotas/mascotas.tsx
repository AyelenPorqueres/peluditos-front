'use client'
import { useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import './mascotas.css'



export default function Mascotas(props: any) {
    const { setMostrarHorarios, setMostrarMascotas }: { setMostrarHorarios: Function, setMostrarMascotas: Function } = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);
    const mascotas = ['Mora', 'Pupy', 'Cata'];

    const guardarHorario = (mascota: string) => {
        setTurnoData({
            ...turnoData,
            mascota: mascota,
        })
        setMostrarHorarios(false);
    }

    const irAtras = () => {
        setMostrarMascotas(false);
        setMostrarHorarios(true);
    }

    return (
        <>
            <div className='d-flex flex-column align-items-start justify-content-start w-100'>
                <i className="bi bi-arrow-left" onClick={irAtras}></i>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <p className="font-text h5 text-center">Mascota</p>
                <p className="font-text text-center">
                    {turnoData?.dia.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase()) + ' ' + turnoData!.hora}
                </p>

                {mascotas.map((mascota: string, index: number) => {
                    return (
                        <button key={index}
                            className="btn-style rounded my-2 col-12 mx-auto"
                            onClick={() => guardarHorario(mascota)}
                        >
                            {mascota}
                        </button>
                    )
                })}
                <button
                    className="btn-style rounded my-2 col-12 mx-auto"
                >
                    Agregar Mascota
                </button>
            </div>
        </>
    );
}