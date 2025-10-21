//import { createUser, updateClient } from '@/app/services/User';
import './clients.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getRazas } from '@/app/services/admin';

interface data {
    id_mascota: number,
    nombre: string;
    edad: number;
    raza: string;
    castrado: boolean;
    desparasitado: boolean;
    sextuple: string;
    antirrabica: string;
    shampoo?: string;
    observaciones?: string;
    veterinario: string;
    tel_veterinario: number;
    direccion_veterinario?: string;
    duenioDni: number;
    duenioNombre: string;
    duenioTelefono: number;
    duenioEmail: string;
}


const schema = yup.object().shape({
    //Datos de la mascota
    id_mascota: yup.number().required(),
    nombreMascota: yup.string().required('El nombre de la mascota es requerido'),
    raza: yup.string().required('La raza es requerida'),
    edad: yup.string()
        .required('La edad es requerida')
        .matches(/^\d+$/, 'La edad debe ser un número')
        .test('positive', 'La edad debe ser positiva', value =>
            value ? parseInt(value) > 0 : true
        ),
    castrado: yup.boolean().required('Debe indicar si está castrado'),
    desparasitado: yup.boolean().required('Debe indicar si está desparasitado'),
    antirrabica: yup.string().required('La fecha de la vacuna de rabia es requerida').matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato inválido, use MM/AAAA').test('no-futura', 'La fecha no puede ser futura', (value) => {
        if (!value) return true;
        const [mes, anio] = value.split('/').map(Number);
        const fecha = new Date(anio, mes - 1);
        return fecha <= new Date();
    }),
    sextuple: yup.string().required('La fecha de la vacuna sextuple es requerida').matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato inválido, use MM/AAAA').test('no-futura', 'La fecha no puede ser futura', (value) => {
        if (!value) return true;
        const [mes, anio] = value.split('/').map(Number);
        const fecha = new Date(anio, mes - 1);
        return fecha <= new Date();
    }),
    veterinario: yup.string().required('El nombre del veterinario es requerido'),
    tel_veterinario: yup.string().required('El teléfono del veterinario es requerido').matches(/^\d+$/, 'El teléfono debe ser un número'),
    direccion_veterinario: yup.string().optional(),
    observaciones: yup.string().optional(),
    shampoo: yup.string().optional(),
    //Datos del dueño
    duenioDni: yup.number().required("Por favor ingrese un DNI del dueño"),
    duenioNombre: yup.string().required("Por favor ingrese un nombre del dueño"),
    duenioTelefono: yup.number().required("Por favor ingrese un teléfono del dueño"),
    duenioEmail: yup.string().email('Ingrese un email válido').required("Por favor ingrese un email del dueño"),
});

interface clientProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
    action: string;
    updateData: () => void;
}

export const AddClient: React.FC<clientProps> = ({ show, handleClose, data, action, updateData }) => {

    const [errorRegister, setErrorRegister] = useState('');
    const { handleSubmit, register, reset, formState: { errors, isValid } } = useForm<data>({ mode: 'onChange', resolver: yupResolver(schema) as any });
    const [razas, setRazas] = useState<string[]>([]);


    const cargarRazas = async () => {
        const razas = await getRazas() || [];
        setRazas(razas);
    }

    const onSubmit: SubmitHandler<data> = async (newData) => {
        /*const user = {
            id_user: data?.id,
            mail: newData.email,
            password: 'cliente1234',
            name: newData.name,
            lastname: newData.lastname,
            dni: newData.dni,
            phone: newData.tel,
            role: 'client'
        }*/

        if (action == 'Agregar') {
            const resp = 409;//await createUser(user);

            if (resp == 409) {
                setErrorRegister('El mail indicado ya se encuentra registrado.')
            } else {
                Swal.fire({
                    title: `Alta Cliente`,
                    text: "Cliente registrado con exito!",
                    icon: "success"
                });
                handleClose();
                reset();
                updateData();
            }
        } else if (action == 'Modificar') {
            if (/*data.mail == newData.email && data.name == newData.name && data.lastname == newData.lastname && data.dni == newData.dni && data.phone == newData.tel*/1 == 1) {
                setErrorRegister('Debe modificar algún dato.');
            } else {
                setErrorRegister('');
                const resp = 404;//await updateClient(user);

                if (resp == 404) {
                    setErrorRegister('No se encontro cliente para actualizar')
                } else {
                    Swal.fire({
                        title: `Modificación Cliente`,
                        text: "Cliente actualizado con exito!",
                        icon: "success"
                    });
                    handleClose();
                    reset();
                    updateData();

                }
            }
        }
    }

    useEffect(() => {
        cargarRazas();
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{action} cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <input defaultValue={data?.id} disabled hidden
                        {...register('id_mascota')} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-2">
                            <label>Nombre de la mascota</label>
                            <input
                                type="text"
                                defaultValue={data?.nombre}
                                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                {...register('nombre')}
                            />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                        </div>

                        <div className='row mb-2'>
                            <div className="col">
                                <label>Raza (o parecido a:)</label>
                                <select
                                    className={`form-control ${errors.raza ? 'is-invalid' : ''}`}
                                    {...register('raza')}
                                    defaultValue={data?.raza || "Seleccione una raza"}
                                >
                                    <option key={0} value="" disabled>Seleccione una raza</option>
                                    {razas.map((raza: any) => (
                                        <option key={raza.id_raza} value={raza.raza}>{raza.raza}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col">
                                <label>Edad (años)</label>
                                <input
                                    type="number"
                                    defaultValue={data?.edad}
                                    className={`form-control ${errors.edad ? 'is-invalid' : ''}`}
                                    {...register('edad')}
                                />
                                {errors.edad && <div className="invalid-feedback">{errors.edad.message}</div>}
                            </div>
                        </div>
                        <div className='row mb-2'>

                            <div className=" col">
                                <label className="form-check-label">Vacuna de la rabia</label>
                                <input
                                    type="text"
                                    placeholder="MM/AAAA"
                                    defaultValue={data?.antirrabica}
                                    className={`form-control ${errors.antirrabica ? 'is-invalid' : ''}`}
                                    {...register('antirrabica')}
                                />
                                {errors.antirrabica && <div className="text-danger">{errors.antirrabica.message}</div>}
                            </div>
                            <div className=" col">
                                <label className="form-check-label">Vacuna sextuple</label>
                                <input
                                    type="text" placeholder="MM/AAAA"
                                    defaultValue={data?.sextuple}
                                    className={`form-control ${errors.sextuple ? 'is-invalid' : ''}`}
                                    {...register('sextuple')}
                                />
                                {errors.sextuple && <div className="text-danger">{errors.sextuple.message}</div>}
                            </div>
                        </div>
                        <div className='row mb-2 ms-1'>
                            <div className="form-check col">
                                <input
                                    type="checkbox"
                                    defaultChecked={data?.desparasitado}
                                    className="form-check-input"
                                    {...register('desparasitado')}
                                />
                                <label className="form-check-label">Desparasitado</label>
                                {errors.desparasitado && <div className="text-danger">{errors.desparasitado.message}</div>}
                            </div>

                            <div className="form-check col">
                                <input
                                    type="checkbox"
                                    defaultChecked={data?.castrado}
                                    className="form-check-input"
                                    {...register('castrado')}
                                />
                                <label className="form-check-label">Castrado</label>
                                {errors.castrado && <div className="text-danger">{errors.castrado.message}</div>}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label>Veterinario</label>
                            <input
                                type="text"
                                defaultValue={data?.veterinario}
                                className={`form-control ${errors.veterinario ? 'is-invalid' : ''}`}
                                {...register('veterinario')}
                            />
                            {errors.veterinario && <div className="invalid-feedback">{errors.veterinario.message}</div>}
                        </div>

                        <div className='row mb-2'>
                            <div className="col">
                                <label>Tel. Veterinario</label>
                                <input
                                    type="text"
                                    defaultValue={data?.tel_veterinario}
                                    className={`form-control ${errors.tel_veterinario ? 'is-invalid' : ''}`}
                                    {...register('tel_veterinario')}
                                />
                                {errors.tel_veterinario && <div className="invalid-feedback">{errors.tel_veterinario.message}</div>}
                            </div>
                            <div className="col">
                                <label>Dirección Veterinario</label>
                                <input
                                    type="text"
                                    defaultValue={data?.direccion_veterinario}
                                    className={`form-control ${errors.direccion_veterinario ? 'is-invalid' : ''}`}
                                    {...register('direccion_veterinario')}
                                />
                                {errors.direccion_veterinario && <div className="invalid-feedback">{errors.direccion_veterinario.message}</div>}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label>Observaciones</label>
                            <textarea
                                defaultValue={data?.observaciones}
                                className={`form-control ${errors.observaciones ? 'is-invalid' : ''}`}
                                {...register('observaciones')}
                                placeholder='Escribe aquí cualquier detalle adicional que consideres importante del comportamiento o salud de tu mascota (Miedos, fobias, alergias, cuidados especiales, etc.)'
                                rows={3}
                            />
                            {errors.observaciones && <div className="invalid-feedback">{errors.observaciones.message}</div>}
                        </div>
                        <small className='text-validation-admin'>{errorRegister}</small>
                        <button type='submit' disabled={!isValid} className='button-agregarcliente'>{action} cliente</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

