'use client';

import './bannerHome.css'


export function BannerHome() {

    return (
        <>

            {/* <div className='container-fluid position-relative' style={{ overflow: 'hidden' }}>
                <div className='row'>

                    <div className="text-start ml-5 px-3 col-md-4  col-lg-4 col-sm-12 banner-text">
                        <p className="title-name mb-3 ">Un espacio de amor y profesionalismo dedicado a tu mejor amigo.</p>
                        <button className="btn-style">Reserva tu turno</button>
                    </div>

                    <div className="p-0 col-lg-8 col-sm-12 not-first:">
                        <img
                            src="/images/banner.png"
                            alt="Perro en baño de burbujas"
                            className="w-100 position-relative img-fluid"
                            style={{ zIndex: 1 }}
                        />

                   
                    </div>
                    <div className="position-absolute bottom-0  start-0 w-100" style={{ height: '110px' }}>
                            <svg
                                viewBox="0 0 1440 190"
                                className="w-100 h-100"
                                
                            >
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
            </div> */}

            <div className="container-fluid p-0 position-relative" style={{ overflow: 'hidden' }}>
                <div className="row m-0">

                    <div className=" p-5 col-md-4 col-lg-6 col-sm-12 banner-text d-flex flex-column justify-content-center align-items-start text-start" >
                        <p className="title-name mb-2 ">Un espacio de amor y profesionalismo dedicado a tu mejor amigo.</p>
                        <button className="btn-style">Reserva tu turno</button>
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
