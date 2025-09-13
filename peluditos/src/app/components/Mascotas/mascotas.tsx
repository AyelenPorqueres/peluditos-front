'use client'
import { useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import './mascotas.css'
import { Button, Modal } from 'react-bootstrap';
import AgregarMascota from '../AgregarMascota/agregarMascota';



export default function Mascotas(props: any) {
    const { setMostrarUsuario, setMostrarMascotas, setMostrarPeluqueras }: { setMostrarUsuario: Function, setMostrarMascotas: Function, setMostrarPeluqueras: Function } = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);
    const mascotas = ['Mora', 'Pupy', 'Cata'];
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const guardarMascota = (mascota: string) => {
        setTurnoData({
            ...turnoData,
            mascota: mascota,
        })
        setMostrarMascotas(false);
        setMostrarPeluqueras(true);
    }

    const irAtras = () => {
        setMostrarMascotas(false);
        setMostrarUsuario(true);
    }

    //por ahora lo manejo con el modal
   /* const agregarMascota = () => {
        setMostrarMascotas(false);
        setMostrarAgregarMascota(true);
    }*/

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
                            onClick={() => guardarMascota(mascota)}
                        >
                            {mascota}
                        </button>
                    )
                })}
                <button 
                    className="btn-style rounded my-2 col-12 mx-auto"
                    onClick={handleShow}
                >
                    Agregar Mascota
                </button>
                <AgregarMascota show={show} handleClose={handleClose}></AgregarMascota>
            </div>

        </>
    );
}