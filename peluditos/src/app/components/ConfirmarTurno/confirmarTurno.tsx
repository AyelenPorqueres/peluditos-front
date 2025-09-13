import { useContext } from 'react';
import { TurnoContext } from '@/app/context/turno.context';



export default function ConfirmarTurno(props: any) {
    const  {setMostrarPeluqueras, setMostrarConfirmarTurno }: {setMostrarPeluqueras: Function, setMostrarConfirmarTurno: Function } = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);


    const guardarTurno= () => {
    
    }

    const irAtras = () => {
        setMostrarConfirmarTurno(false);
        setMostrarPeluqueras(true);
    }

    return (
        <>
            <div className='d-flex flex-column align-items-start justify-content-start w-100'>
                <i className="bi bi-arrow-left" onClick={irAtras}></i>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <p className="font-text h5 text-center">Confirmar Turno</p>
                <p className="font-text text-center">
                    {turnoData?.dia.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase()) + ' ' + turnoData!.hora + ' - ' + turnoData?.mascota + ' - ' + turnoData?.peluquera}
                </p>

               
                <button 
                    className="btn-style rounded my-2 col-12 mx-auto"
                    onClick={guardarTurno}
                >
                    Confirmar turno
                </button>
                
            </div>

        </>
    );
}