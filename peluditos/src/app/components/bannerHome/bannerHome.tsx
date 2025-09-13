'use client';

import './bannerHome.css'
import { useRouter } from 'next/navigation';


export function BannerHome() {
    const router = useRouter();
    const handleClickClient = () => {
        router.push('/client');
    }

    return (
        <>
            {/*<div className="banner" >
                <div className="texto-banner d-flex align-items-center">
                    <div className="col-1"></div>
                    <div className="col-md-8 col-lg-8 col-sm-4 col-xs-4 d-flex flex-column justify-content-center align-items-start text-start" >
                        <p className="title-name title-banner p-2 m-2 col-4 ">Un espacio de amor y profesionalismo dedicado a tu mejor amigo</p>
                        <button className="btn-style p-2 m-2" onClick={handleClickClient}>Reserva tu turno</button>
                    </div>

                 
                </div>
            </div>*/}
            <div className="container-fluid" >
                <div className="row d-flex align-items-center">
                    <div className='col-4 p-0'>
                        <img src="/images/banner1.png" alt="Perro saludando" className="img-banner img-fluid" />
                    </div>
                    <div className='col-4 p-0'>
                        <img src="/images/banner2.png" alt="Perro saludando" className="img-banner img-fluid" />
                    </div>
                    <div className='col-4 p-0'>
                        <img src="/images/banner3.png" alt="Perro saludando" className="img-banner img-fluid" />
                    </div>
                </div>
                <div className='row d-flex align-items-center text-center'>
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center" >
                        <p className="title-name title-banner p-2 m-2 col-8 ">Un espacio de amor y profesionalismo dedicado a tu mejor amigo</p>
                        <button className="btn-style p-2 m-2 btn-reserva" onClick={handleClickClient}>Reserva tu turno</button>
                    </div>
                </div>
            </div>
        </>
    )
}
