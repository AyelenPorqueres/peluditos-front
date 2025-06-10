'use client'
import { UserContext } from "@/app/context/user.context";
import "./page.css";
import { useContext, useState } from "react";
import Calendario from "@/app/components/Calendario/calendario";
import { TurnoContext, TurnoContextProvider } from "@/app/context/turno.context";
import Horarios from "@/app/components/Horarios/horarios";
import Mascotas from "@/app/components/Mascotas/mascotas";

export default function ClientPage() {
    const { userData } = useContext(UserContext);
    const { turnoData } = useContext(TurnoContext);
    const [mostrarCalendario, setMostrarCalendario] = useState(true);
    const [mostrarHorarios, setMostrarHorarios] = useState(false);
    const [mostrarMascotas, setMostrarMascotas] = useState(false);


    return (
        <TurnoContextProvider>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 d-flex flex-column align-items-center justify-content-center">
                            <h1 className="title-name display-6 my-3"> ¡Hola, {userData?.nombre} !</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 d-flex flex-column align-items-center justify-content-center rounded turnero">
                            {mostrarCalendario &&
                                <Calendario 
                                    setMostrarCalendario={setMostrarCalendario} 
                                    setMostrarHorarios={setMostrarHorarios} 
                                />}
                            {mostrarHorarios &&
                                <Horarios 
                                    setMostrarCalendario={setMostrarCalendario} 
                                    setMostrarHorarios={setMostrarHorarios} 
                                    setMostrarMascotas={setMostrarMascotas} 

                                />}
                             {mostrarMascotas &&
                                <Mascotas 
                                    setMostrarHorarios={setMostrarHorarios} 
                                    setMostrarMascotas={setMostrarMascotas} 
                                />}
                        </div>
                    </div>
                    <div className="row">
                        <h1>Mis Turnos</h1>
                    </div>
                </div>
            </main>
        </TurnoContextProvider>
    )
} 