import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import './adminTable.css'
import { AddClient } from '../modalsAdmin/clients';
import { AddProfessional } from '../modalsAdmin/professional';
import { AddAppoinments } from '../modalsAdmin/appointments';
import Swal from 'sweetalert2';
import { ModalMascota } from '../modalsAdmin/mascotas';
import { Imascota } from '@/app/model/Imascota';
import { ICliente } from '@/app/model/ICliente';
//import { deleteClient, deleteProf } from '@/app/services/User';
//import { deleteAppointment, deleteService } from '@/app/services/Services';

interface tableProps {
  data: any[];
  columns: any[];
  filter: string;
  updateData: () => void;
}
 
export const AdminTable: React.FC<tableProps> = ({ data, columns, filter, updateData }) => {
  const [showClient, setShowClient] = useState<boolean>(false);
  const [showProfessional, setShowProfessional] = useState<boolean>(false);
  const [showAppointments, setShowAppointments] = useState<boolean>(false);
  const [showMascotas, setShowMascotas] = useState<boolean>(false);
  const [showEditClient, setShowEditClient] = useState<boolean>(false);
  const [showEditProfessional, setShowEditProfessional] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Modificar');
  const [modalMascotaData, setModalMascotaData] = useState<Imascota  | undefined >(undefined);

  //Mostrar modal correspondiente segun el filtro, la acccion y los datos (en caso de edición)
  const handleShow = ( action: string, data?: Imascota ) => {
    switch (filter) {
      case "Clientes":
        setShowEditClient(true)
        break;
      case "Profesionales":
        setShowEditProfessional(true)
        break;
      case "Mascotas":
        setAction(action);
        setModalMascotaData(action === "Modificar" || action === "Ver" ? data : undefined);
        setShowMascotas(true);
        break;
    }
  };

  const deleteFunction = async (id: number) => {
    switch (filter) {
      case "Clientes":
        return 200//await deleteClient(id);
      case "Profesionales":
        return 200//await deleteProf(id);
      case "Turnos":
        return 200//await deleteAppointment(id);
      case "Servicios":
        return 200//await deleteService(id);
    }
  }

  const deleteRow = async (id: number) => {
    let deleteItem = ''
    switch (filter) {
      case "Clientes":
        deleteItem = 'cliente';
        break;
      case "Profesionales":
        deleteItem = 'profesional';
        break;
      case "Turnos":
        deleteItem = 'turno';
        break;
      case "Servicios":
        deleteItem = 'servicio';
        break;
    }

    Swal.fire({
      title: "Advertencia",
      text: `Estas seguro de que quieres eliminar el ${deleteItem} numero ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await deleteFunction(id);
        if (resp == 200) {
          Swal.fire({
            title: `Eliminar ${deleteItem}`,
            text: `El ${deleteItem} fue eliminado con exito!`,
            icon: "success"
          });
          updateData();
        } else {
          Swal.fire({
            title: `${resp}`,
            text: `No se pudo eliminar el ${deleteItem}`,
            icon: "error"
          });
        }
      }
    });
  }

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="container-principal p-1">
      <div className='d-flex flex-row justify-content-between'>

        {/* Buscador */}
        <input className='inputbuscador-admin' placeholder="Buscar "
          type='text'
          value={filtering}
          onChange={e => setFiltering(e.target.value)}
        />

        <button onClick={() => handleShow( "Agregar")} className='btn-style'>
          Agregar {filter} +
        </button>

      </div>

      <table className='table-admin-container'>
        <thead className='table-admin-thead'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                //Columnas de la tabla
                <th
                  className='table-admin-th'
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {/* Encabezado de columna */}
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {/* Iconos de ordenamiento */}
                  {{
                    'asc': <i className="bi bi-sort-down-alt icon-down" />,
                    'desc': <i className="bi bi-sort-up icon-up" />
                  }
                  [header.column.getIsSorted() as string] ?? <i className="bi bi-arrow-down-up icon-double-arrow" />
                  }
                </th>
              ))}
              <th className='table-admin-th'>Ajustes</th>
            </tr>
          ))}
        </thead>
        <tbody className='body-ajustes'>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td className='table-admin-td' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className='table-admin-td'>
                <i onClick={() => handleShow("Ver", row.original)} className='bi bi-eye icon' />
                {filter !== 'Turnos' &&
                  <i onClick={() => handleShow("Modificar", row.original)} className='bi bi-pencil icon' />
                }
                {/*filter == 'Clientes' && <AddClient data={row.original} show={row.original.id == showEditClient} handleClose={() => setShowEditClient(0)} action='Modificar' updateData={updateData} />}
                {filter == 'Profesionales' && <AddProfessional data={row.original} show={row.original.id == showEditProfessional} handleClose={() => setShowEditProfessional(0)} action='Modificar' updateData={updateData} />}
                {filter == 'Servicios' && <AddServices data={row.original} show={row.original.id == showEditServices} handleClose={() => setShowEditServices(0)} action='Modificar' updateData={updateData} />}
                <i className='bi bi-trash3 icon-trash' onClick={() => deleteRow(row.original.id)} />*/}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginacion */}
      <i onClick={() => table.setPageIndex(0)} className="bi bi-chevron-double-left"></i>
      <i onClick={() => table.previousPage()} className="bi bi-chevron-left"></i>
      <i onClick={() => table.nextPage()} className="bi bi-chevron-right"></i>
      <i onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="bi bi-chevron-double-right"></i>
      {filter == 'Mascotas' &&
        <ModalMascota
          key={`${modalMascotaData ? modalMascotaData.id_mascota : ''}-${action}`}
          data={modalMascotaData}
          show={showMascotas}
          handleClose={() => setShowMascotas(false)}
          action={action}
          updateData={updateData}
        />}
    </div>
  );
}