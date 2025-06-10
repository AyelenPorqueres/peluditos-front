'use client'
import { useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import './horarios.css'



export default function Horarios(props: any) {
    const { setMostrarCalendario, setMostrarHorarios, setMostrarMascotas }: { setMostrarCalendario: Function, setMostrarHorarios: Function , setMostrarMascotas: Function} = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);
    const horariosDisp = ['10:00', '14:00', '16:00'];

    const guardarHorario = (horario: string) => {
        setTurnoData({...turnoData,
            hora: horario,
        })
        setMostrarHorarios(false);
        setMostrarMascotas(true);
    }

    const irAtras = () => {
        setMostrarHorarios(false);
        setMostrarCalendario(true);
    }

    return (
        <>
            <div className='d-flex flex-column align-items-start justify-content-start w-100'>
                <i className="bi bi-arrow-left" onClick={irAtras}></i>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <p className="font-text h5 text-center">Horarios disponibles</p>
                <p className="font-text text-center">
                    {turnoData?.dia.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase())}
                </p>

                {horariosDisp.map((horario: string, index: number) => {
                    return (
                        <button key={index}
                            className="btn-style rounded my-2 col-12 mx-auto"
                            onClick={() => guardarHorario(horario)}
                        >
                            {horario}
                        </button>
                    )
                })}
            </div>
        </>
    );
}