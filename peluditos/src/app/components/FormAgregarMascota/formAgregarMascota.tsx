'use client'
import './formAgregarMascota.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';



const schema = yup.object().shape({
    nombreMascota: yup.string().required('El nombre de la mascota es requerido'),
    raza: yup.string().required('La raza es requerida'),
    edad: yup.number().required('La edad es requerida').positive('La edad debe ser positiva'),
    castrado: yup.boolean().required('Debe indicar si está castrado'),
    vacunasAlDia: yup.boolean().required('Debe indicar si las vacunas están al día'),
    desparasitado: yup.boolean().required('Debe indicar si está desparasitado'),
    observaciones: yup.string().optional(),
});

interface FormData {
    nombreMascota: string;
    raza: string;
    edad: number;
    castrado: boolean;
    vacunasAlDia: boolean;
    desparasitado: boolean;
    observaciones?: string;
}

export default function FormAgregarMascota(props: any) {


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) as any
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <>
            <form id="pet-form" onSubmit={handleSubmit(onSubmit)} className="pet-form">
                <div className="form-group mb-2">
                    <label>Nombre de la mascota</label>
                    <input
                        type="text"
                        className={`form-control ${errors.nombreMascota ? 'is-invalid' : ''}`}
                        {...register('nombreMascota')}
                    />
                    {errors.nombreMascota && <div className="invalid-feedback">{errors.nombreMascota.message}</div>}
                </div>

                <div className='row mb-2'>
                    <div className="col">
                        <label>Raza</label>
                        <input
                            type="text"
                            className={`form-control ${errors.raza ? 'is-invalid' : ''}`}
                            {...register('raza')}
                        />
                        {errors.raza && <div className="invalid-feedback">{errors.raza.message}</div>}
                    </div>

                    <div className="col">
                        <label>Edad (años)</label>
                        <input
                            type="number"
                            className={`form-control ${errors.edad ? 'is-invalid' : ''}`}
                            {...register('edad')}
                        />
                        {errors.edad && <div className="invalid-feedback">{errors.edad.message}</div>}
                    </div>
                </div>

                <div className='row mb-2 ms-1'>
                    <div className="form-check col">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register('vacunasAlDia')}
                        />
                        <label className="form-check-label">Vacunas al día</label>
                        {errors.vacunasAlDia && <div className="text-danger">{errors.vacunasAlDia.message}</div>}
                    </div>

                    <div className="form-check col">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register('desparasitado')}
                        />
                        <label className="form-check-label">Desparasitado</label>
                        {errors.desparasitado && <div className="text-danger">{errors.desparasitado.message}</div>}
                    </div>

                    <div className="form-check col">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register('castrado')}
                        />
                        <label className="form-check-label">Castrado</label>
                        {errors.castrado && <div className="text-danger">{errors.castrado.message}</div>}
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label>Observaciones</label>
                    <textarea
                        className={`form-control ${errors.observaciones ? 'is-invalid' : ''}`}
                        {...register('observaciones')}
                        rows={3}
                    />
                    {errors.observaciones && <div className="invalid-feedback">{errors.observaciones.message}</div>}
                </div>
                <button type="submit" className='btn-style'> Guardar</button>
            </form>
        </>
    );
}
