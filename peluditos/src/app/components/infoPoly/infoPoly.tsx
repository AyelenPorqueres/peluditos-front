'use client';
import './infoPoly.css'

export function InfoPoly() {

    return (
        <>


            <div className='row'>

                <div className="position-relative p-0" style={{ height: 'auto' }} >


                    <svg
                        viewBox="0 0 1440 320"

                        style={{ display: 'block', width: '100%', height: 'auto' }}
                    >
                        <path
                            fill="#C27043"
                            d="M0,160 C340,260 1080,50 1440,160 L1440,320 L0,340 Z"
                        />
                    </svg>

                </div>
                <div className="container-fluid py-5 " style={{ background: '#C27043'}}>
                    <div className="row align-items-center" >
                        <div className="col-md-5 text-center mb-2 mb-md-0">
                            <img
                                src="/images/poly.png"
                                alt="Perro en baño de burbujas"
                                className=" position-relative"
                                style={{ width: '350px', height: 'auto', zIndex: 1 }}
                            />
                        </div>

                        <div className="col-md-7 text-white">
                            <h3 className="title-infopoly text-center">¡Hola, soy Poly!</h3>
                            <p className='text-infopoly p-3'>Mi misión es brindar un servicio personalizado que combine amor, dedicación y técnica para cada peludito que pasa por mis manos.

                                En Peluditos  no solo me enfoco en embellecer a tu mascota, sino en comprender sus necesidades específicas. Mi experiencia como Groomer y mis capacitaciones constantes me permiten adaptarme a diferentes mantos, razas y personalidades, asegurando que cada corte y cuidado sea perfecto para ellos.

                                Más allá de la estética, creo firmemente en educar y generar un vínculo más profundo entre humanos y animales. Por eso, también ofrezco orientación sobre cuidados, adiestramiento y bienestar animal, ayudándote a entender mejor a tu compañero peludo.

                                ¡Espero conocerte pronto y ser parte del cuidado integral de tu peludito!
                            </p>
                            <div className="d-flex justify-content-center mt-3" >
                               <a href='#contacto'><button className="btn-style">Contactame</button></a> 
                            </div>
                        </div>

                    </div>
                </div>

                <div className="position-relative " style={{ height: 'auto' }}>
                    <svg
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '110px',
                            transform: 'rotate(180deg)',
                        }}
                    >
                        <path
                            fill="#C27043"
                            d="M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z"
                        />
                    </svg>
                </div> 

            </div>


        </>
    )
}
