'use client'
import { useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import './agregarMascota.css'



export default function AgregarMascota(props: any) {
    const {setMostrarMascotas }: {setMostrarMascotas: Function } = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);

    const guardarHorario = (mascota: string) => {
        setTurnoData({
            ...turnoData,
            mascota: mascota,
        })
    }

    const irAtras = () => {
        setMostrarMascotas(false);
    }

    return (
        <>
            <div className='d-flex flex-column align-items-start justify-content-start w-100'>
                <i className="bi bi-arrow-left" onClick={irAtras}></i>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <p className="title-name display-6">Requisitos para el turno</p>
                <p className='font-text h5'>Libreta sanitaria actualizada: vacunas anuales,rabia, séxtuple.</p>
                <p className='font-text h5'>Desparacitación cada 6 meses.</p>
                <p className='font-text h5'>Tratamiento antipulgas: pipeta o pastilla aplicar 5 días antes del baño.</p>
                <p className='font-text h5'>Puntualidad: avisar con 24 hs de antelación si no puede asistir, de lo contrario se cobrará el servicio completo.</p>
                <p className='font-text h5'>Más de 10 minutos de retraso implicará la cancelación del turno y el cobro del servicio completo.</p>

                <button
                    className="btn-style rounded my-2 col-12 mx-auto"
                >
                    Agregar Mascota
                </button>
            </div>
        </>
    );
}