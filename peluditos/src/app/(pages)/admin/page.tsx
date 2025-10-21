'use client'
import { Menu } from "@/app/components/nav/nav";
//import { getAllAppointments, getReportForAdmin, getServicesForAdmin } from "@/app/services/Services";
//import { getAllClients, getAllProf } from "@/app/services/User";
import { useContext, useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
import './page.css';
import { UserContext } from "@/app/context/user.context";
import { AdminTable } from "@/app/components/AdminTable/adminTable";
import { getAllMascotas, getClientes } from "@/app/services/client";
import { getPeluqueras } from "@/app/services/admin";

const columnsClient = [
  {
    header: "DNI",
    accessorKey: "dni",
  },
  {
    header: "Nombre y Apellido",
    accessorKey: "nombre",
  },
  {
    header: "Mail",
    accessorKey: "mail"
  },
  {
    header: "Telefono",
    accessorKey: "telefono",
  },
];

const columnsMascotas = [
  {
    header: "ID",
    accessorKey: "id_mascota",
  },
  {
    header: "Nombre",
    accessorKey: "nombre",
  },
  {
    header: "Edad",
    accessorKey: "edad"
  },
  {
    header: "Raza",
    accessorKey: "raza",
  },
  {
    header: "Dueño DNI",
    accessorKey: "duenio.dni",
  },
  {
    header: "Nombre y Apellido",
    accessorKey: "duenio.nombre",
  },
  {
    header: "Teléfono",
    accessorKey: "duenio.telefono",
  },
];

const columnsProf = [
  {
    header: "ID",
    accessorKey: "id_peluquera",
  },
  {
    header: "Nombre y Apellido",
    accessorKey: "nombre",
  },
  {
    header: "DNI",
    accessorKey: "dni",
  },
  {
    header: "Fecha de Nacimiento",
    accessorKey: "fecha_nacimiento",
  },
  {
    header: "Teléfono",
    accessorKey: "telefono"
  },
];

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

  const loadClientes = async () => {
    const resp = await getClientes();
    if (resp) setData(resp);
  }

  const loadMascotas = async () => {
    const resp = await getAllMascotas();
    if (resp) setData(resp);
  }

  const loadProf = async () => {
    const resp = await getPeluqueras();
    if (resp) setData(resp);
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
      case 'Mascotas':
        loadMascotas();
        break;

      case 'Clientes':
        loadClientes();
        break;

      case 'Profesionales':
        loadProf();
        break;

      case 'Turnos':
        loadAppointments();
        break;
    }
  }

  useEffect(() => {
    switch (filter) {
      case 'Mascotas':
        loadMascotas();
        break;

      case 'Clientes':
        loadClientes();
        break;

      case 'Profesionales':
        loadProf();
        break;

      case 'Turnos':
        loadAppointments();
        break;

      default:
        loadClientes();
    }
  }, [filter])

  const columns = useMemo(() => {
    switch (filter) {
      case 'Clientes':
        return columnsClient;

      case 'Mascotas':
        return columnsMascotas;

      case 'Profesionales':
        return columnsProf;

      case 'Turnos':
        return columnsAppoint;

      default:
        return columnsClient;
    }
  }, [filter])

  const { userData } = useContext(UserContext);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

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
              <Dropdown.Item onClick={() => setFilter('Mascotas')}>Mascotas</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Profesionales')}>Profesionales</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Turnos')}>Turnos</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <AdminTable data={data} columns={columns} filter={filter} updateData={updateData} />
      </main>
    </>
  )
}
export default AdminPage;