import { useState } from 'react';
import { useGetUsersQuery } from '../../api/UsersApi';
import { useGetRentalsQuery } from '../../api/RentalsApi';
import { useGetCarsQuery } from '../../api/CarsApi';
import {
  useGetReservationsQuery,
  Reservation,
} from '../../api/ReservationsApi'
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';
import { HiFilter, HiOutlinePlus } from 'react-icons/hi';
import { RiseLoader } from 'react-spinners';
import DashboardTable, { Column } from '../../components/DashboardTable';

const ReservationsDashboard = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: reservations = [], error, isLoading } = useGetReservationsQuery();
  const { data: users = [] } = useGetUsersQuery();
  const { data: rentals = [] } = useGetRentalsQuery();
  const { data: cars = [] } = useGetCarsQuery();

  const renderError = error && (
    <p style={{ color: 'red' }}>
      Error: {
        'data' in error
         ? (error as { data: { message: string }}).data?.message || 'An unexpected error occurred!'
         : (error as { error: { message: string }}).error?.message || 'An unexpected error occurred!'
      }
    </p>
  );

  const columns: Column<Reservation>[] =  [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: false,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "user",
      header: "User Email",
      enableSorting: true,
      cell: (info: any) => {
        const user = users.find((user) => user.id === info.getValue());
        return <span>{user ? user.email : "Unknown"}</span>;
      },
    },
    {
      accessorKey: "cars",
      header: "Cars Reserved",
      enableSorting: false,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      enableSorting: false,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      enableSorting: false,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "id",
      header: "Actions",
      enableSorting: false,
      cell: (info: any) => (
        <div className='d-flex justify-content-start gap-3'>
          <Button
            variant="primary"
          >
            Edit
          </Button>
          <Button
            variant="danger"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filteredReservations = reservations.filter((reservation) =>
    Object.values(reservation)
      .join("")
      .toLowerCase()
      .includes(globalFilter.toLowerCase())
  );

  return (
    <div>
      <h1>Reservations Dashboard</h1>

      {renderError}

      {isLoading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'><RiseLoader color="#8f8f8f" size={10} /></div>
      ) : (
        <>
          <div className="container text-center my-3">
            <div className="row d-flex justify-content-between align-items-center gap-3">
              <div className="col-12 col-sm-12 col-md-4 d-flex justify-content-center">
                <Button className="d-flex align-items-center" variant="success">
                  <HiOutlinePlus /> Add New Reservation
                </Button>
              </div>
              <div className="col-12 col-sm-12 col-md-4 d-flex justify-content-center">
                <div className="input-group">
                  <input
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <button className="btn btn-outline-dark" disabled>
                    <HiFilter className="text-dark" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DashboardTable
            tableData={filteredReservations}
            allColumns={columns}
            enableSort
          />
        </>
      )}
    </div>
  );
};

export default ReservationsDashboard;
