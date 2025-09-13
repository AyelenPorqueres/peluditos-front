'use client'
import { Menu } from "@/app/components/nav/nav";
//import { getAllAppointments, getReportForAdmin, getServicesForAdmin } from "@/app/services/Services";
//import { getAllClients, getAllProf } from "@/app/services/User";
import { useContext, useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
import './page.css';
//import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
//import { PDFReport } from "@/app/components/pdfReport/pdfReport";
import { UserContext } from "@/app/context/user.context";
import { AdminTable } from "@/app/components/AdminTable/adminTable";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const columnsClient = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Nombres",
    accessorKey: "name",
  },
  {
    header: "Apellido",
    accessorKey: "lastname",
  },
  {
    header: "DNI",
    accessorKey: "dni",
  },
  {
    header: "Teléfono",
    accessorKey: "phone"
  },
  {
    header: "Email",
    accessorKey: "mail",
  },
];

const columnsProf = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Nombres",
    accessorKey: "name",
  },
  {
    header: "Apellido",
    accessorKey: "lastname",
  },
  {
    header: "DNI",
    accessorKey: "dni",
  },
  {
    header: "Teléfono",
    accessorKey: "phone"
  },
  {
    header: "Email",
    accessorKey: "mail",
  },
  {
    header: "Especialidad",
    accessorKey: "speciality",
  },
  {
    header: "Dias",
    accessorKey: "days",
  },
  {
    header: "Horario",
    accessorFn: (row:any) => `De ${row.hour_begin} a ${row.hour_end}`
  },
];

const columnsService = [{
  header: "ID",
  accessorKey: "id",
},
{
  header: "Servicio",
  accessorKey: "service",
},
{
  header: "Descripción",
  accessorKey: "description",
},
{
  header: "Especialidad",
  accessorKey: "speciality",
},
{
  header: "Profesional",
  accessorKey: "professional",
},
{
  header: "Precio",
  accessorKey: "price",
},
]

const columnsAppoint = [{
  header: "ID",
  accessorKey: "id",
},
{
  header: "Día",
  accessorKey: "date",
},
{
  header: "Hora",
  accessorKey: "hour",
},
{
  header: "Servicio",
  accessorKey: "service",
},
{
  header: "Cliente",
  accessorKey: "user",
},]

function AdminPage() {
  const [filter, setFilter] = useState('Clientes');
  const [data, setData] = useState<any[]>([])

 


  const loadClients = async () => {
    const resp = [{"id":1,"name":"Juan","lastname":"Perez","dni":"12345678","phone":"1234567890","mail":"juan.perez@example.com"},
  {
    id: 2,
    name: "Maria",
    lastname: "Gomez",
    dni: "87654321",
    phone: "0987654321",
    mail: "maria.gomez@example.com"
  }]//await getAllClients();
    setData(resp);
  }

  const loadProf = async () => {
    const resp = [{
    "id": 1,
    "name": "Juan",
    "lastname": "Perez",
    "dni": "12345678",
    "phone": "1234567890",
    "mail": "juan.perez@example.com",
    "speciality": "Cardiología",
    "days": ["Lunes", "Miércoles", "Viernes"],
    "hour_begin": "09:00",
    "hour_end": "17:00"
  },]//await getAllProf();
    setData(resp);
  }

  const loadServices = async () => {
    const resp = [{"id":1,"service":"Corte de pelo","description":"Corte de pelo completo para perros y gatos","speciality":"Peluquería","professional":"Ana López","price":50
},
{"id":2,"service":"Baño y secado","description":"Baño con shampoo especial y secado con toalla o secador","speciality":"Peluquería","professional":"Carlos Martínez","price":30
},]// await getServicesForAdmin();
    setData(resp);
  }

  const loadAppointments = async () => {
    const resp = [{
  "id": 1,
  "date": "2023-09-01",
  "hour": "10:00",
  "service": "Corte de pelo",
  "user": "Juan Perez"
},
{
  "id": 2,
  "date": "2023-09-02",
  "hour": "11:00",
  "service": "Baño y secado",
  "user": "Maria Gomez"
}]// await getAllAppointments();
    setData(resp);
  }

  const updateData = () => {
    switch (filter) {
      case 'Clientes':
        loadClients();
        break;

      case 'Profesionales':
        loadProf();
        break;

      case 'Servicios':
        loadServices();
        break;

      case 'Turnos':
        loadAppointments();
        break;
    }
  }

  useEffect(() => {
    switch (filter) {
      case 'Clientes':
        loadClients();
        break;

      case 'Profesionales':
        loadProf();
        break;

      case 'Servicios':
        loadServices();
        break;

      case 'Turnos':
        loadAppointments();
        break;

      default:
        loadClients();
    }
  }, [filter])

  const columns = useMemo(() => {
    switch (filter) {
      case 'Clientes':
        return columnsClient;

      case 'Profesionales':
        return columnsProf;

      case 'Servicios':
        return columnsService;

      case 'Turnos':
        return columnsAppoint;

      default:
        return columnsClient;
    }
  }, [filter])

  const { userData } = useContext(UserContext);
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

  /*const getServicesAdmin = async () => {
    try {
        const report2 = await getReportForAdmin();
        setReport(report2);
    } catch (error) {
        console.error('Error fetching items:', error);
    } finally {
        setLoading(false);
    }
}

useEffect(() => {
  getServicesAdmin();
}, []);  */

/*if (loading) {
  return <div>Loading...</div>;
}*/



const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
const now = new Date();
const date = now.toLocaleDateString(undefined, options);

/*const handleDownload = async () => {
  // crea una instancia del pdf con la ultima actualizacion
  const asPdf = pdf(<PDFReport info={report} role={userData?.role} />);
  
  try {
    // genera el blob del pdf
    const blob = await asPdf.toBlob();
    
    // crea un elemento link, setea un nombre de archivo a la propiedad download.
    // crea un object url para el blob, y desencadena el click en el link.
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_Ganancias_${date}.pdf`;
    link.click();
    
    // limpia el object url
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error generando PDF:', error);
  }
};*/

  return (
    <>
      <header>
        <div>
          <Menu></Menu>
        </div>

      </header>

      <main className="page-admin">
        <div className="d-flex justify-content-between">
          <Dropdown >
            <Dropdown.Toggle className="btn-style">{filter}</Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item onClick={() => setFilter('Clientes')}>Clientes</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Profesionales')}>Profesionales</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Servicios')}>Servicios</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Turnos')}>Turnos</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>   
          {/*<button className='button-pdf' onClick={handleDownload}>Reporte de ganancias<i className="bi bi-download icon-download"></i></button>*/}
        </div>
        <AdminTable data={data} columns={columns} filter={filter} updateData={updateData}/>
      </main>
    </>
  )
}

export default AdminPage;