'use client';

import './bannerHome.css'
import { useRouter } from 'next/navigation';


export function BannerHome() {
    const router = useRouter();
    const handleClickClient = () => {
      router.push('/loginPage');
    }

    return (
        <>

          

            <div className="container-fluid p-0 position-relative" style={{ overflow: 'hidden' }}>
                <div className="row m-0">

                    <div className=" p-5 col-md-4 col-lg-6 col-sm-12 banner-text d-flex flex-column justify-content-center align-items-start text-start" >
                        <p className="title-name mb-2 ">Un espacio de amor y profesionalismo dedicado a tu mejor amigo.</p>
                        <button className="btn-style" onClick={handleClickClient}>Reserva tu turno</button>
                    </div>

                    <div className="p-0 col-lg-6 col-sm-12 position-relative" style={{ zIndex: 1, overflow:'hidden' }}>
                        <img
                            src="/images/banner.png"
                            alt="Perro en baño de burbujas"
                            className="w-100 img-fluid"
                            style={{ display: 'block' }}
                        />
                    </div>
                </div>

               
                <div className='curva-superior'>
                    <svg viewBox="0 0 1440 190" className="w-100 h-100" preserveAspectRatio="none">
                        <path
                            fill="#C27043"
                            d="M0,0 C360,110 1080,60 1440,80 L1440,180 L0,210 Z"
                        />
                        <path
                            fill="#f3ded0"
                            d="M0,110 C360,180 1080,90 1440,120 L1440,240 L0,190 Z"
                        />
                    </svg>
                </div>
            </div>


        </>
    )
}
