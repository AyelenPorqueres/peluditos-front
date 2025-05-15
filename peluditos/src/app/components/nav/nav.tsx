"use client";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



export function Menu(){
 return(
  <>
     <Navbar className="py-0" >
        <Container fluid>
          <Navbar.Brand href="#home" className="mt-0">
            <img
              src="/images/logo-peluditos-8.png"
              width="120"
              height="130"
              className="d-inline-block align-top "
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
  
  
  
  </>


 )
}