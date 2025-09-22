'use client'
import { useContext, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import './agregarMascota.css'
import { Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormAgregarMascota from '../FormAgregarMascota/formAgregarMascota';



const schema = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido'),
    raza: yup.string().required('La raza es requerida'),
    edad: yup.number().required('La edad es requerida').positive('La edad debe ser positiva'),
    peso: yup.number().required('El peso es requerido').positive('El peso debe ser positivo'),
    vacunasAlDia: yup.boolean().required('Debe indicar si las vacunas están al día'),
    desparasitado: yup.boolean().required('Debe indicar si está desparasitado'),
    observaciones: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

export default function AgregarMascota(props: any) {
    const { handleClose, show }: { setMostrarMascotas: Function, handleClose: Function, show: boolean } = props;
    const [mostrarForm, setMostrarForm] = useState(false);
    const [mostrarRequisitos, setMostrarRequisitos] = useState(true);

    const handleForm = () => {
        setMostrarRequisitos(false);
        setMostrarForm(true);
    }

    const cerrar = () => {
        handleClose();
        setMostrarForm(false);
        setMostrarRequisitos(true);
    }

    return (
        <>
            <Modal show={show} onHide={() => cerrar()}>
                {mostrarRequisitos &&
                    <Modal.Header closeButton>
                        <Modal.Title className="title-name">Requisitos para el turno</Modal.Title>
                    </Modal.Header>
                }
                {mostrarForm &&
                    <Modal.Header closeButton>
                        <Modal.Title className="title-name">Carga los datos de tu mascota</Modal.Title>
                    </Modal.Header>
                }
                <Modal.Body>
                    {mostrarRequisitos &&
                        <div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1" icon={faPaw} size="lg" style={{ color: "#400203", }} />
                                <p className='font-text m-1'>Venir con correa y pretal</p>
                            </div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1" icon={faPaw} size="lg" style={{ color: "#400203", }} />
                                <p className='font-text m-1'>Libreta sanitaria actualizada: vacunas anuales de rabia y séxtuple.</p>
                            </div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1" icon={faPaw} size="lg" style={{ color: "#400203", }} />
                                <p className='font-text m-1'>Desparacitación cada 6 meses.</p>
                            </div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1" icon={faPaw} size="lg" style={{ color: "#400203", }} />
                                <p className='font-text m-1'>SI se encuentra con tratamiento antipulgas o garrapatas: pipeta o pastilla aplicar 5 días antes del baño.</p>
                            </div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1" icon={faPaw} size="lg" style={{ color: "#400203", }} />
                                <p className='font-text m-1'>Puntualidad: avisar con 24 hs de antelación si no puede asistir, de lo contrario se cobrará el servicio completo.</p>
                            </div>
                        </div>}
                    {mostrarForm &&
                        <FormAgregarMascota handleClose={handleClose} />
                    }
                </Modal.Body>
                {mostrarRequisitos &&
                    <Modal.Footer>
                        <button className='btn-style' onClick={() => handleForm()}>
                            Siguiente
                        </button>
                    </Modal.Footer>
                }
            </Modal>
        </>
    );
}