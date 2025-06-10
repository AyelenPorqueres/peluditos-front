'use client'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './calendario.css'
import { useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendario(props:any) {
    const { setMostrarCalendario, setMostrarHorarios }: { setMostrarCalendario: Function, setMostrarHorarios:Function } = props;
    const [value, onChange] = useState<Value>(new Date());
    const { turnoData, setTurnoData } = useContext(TurnoContext);

    const guardarDia = () => {
        setMostrarCalendario(false);
        setMostrarHorarios(true);
    }

    useEffect(() => {
        const turnoDataNew = {
            ...turnoData,
            dia: value,
        }
        setTurnoData(turnoDataNew);
      }, [value]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center calendario-box">
            <p className="font-text h5 text-center">Reserve aquí su turno</p>
            <p className="font-text text-center">Seleccione un día</p>
            <Calendar
                className="mi-calendario"
                locale="es-ES"
                value={value}
                onChange={onChange}
                minDate={new Date()}
            />
            <button
                className="btn-style rounded p-1 m-3 my-3 d-grid gap-2 col-6 mx-auto"
                onClick={() => guardarDia()}
            >
                Siguiente
            </button>
        </div>
    );
}