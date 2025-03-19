import { useState, useMemo } from 'react';
import { useGetUsersQuery } from '../../api/UsersApi';
import { useGetRentalsQuery } from '../../api/RentalsApi';
import { useGetCarsQuery } from '../../api/CarsApi';
import {
  Reservation,
  ReservationDTO,
  useGetReservationsQuery,
  useAddReservationMutation,
  useDeleteReservationMutation,
  useUpdateReservationMutation,
} from '../../api/ReservationsApi'
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiFilter, HiOutlinePlus } from 'react-icons/hi';
import { RiseLoader } from 'react-spinners';
import DashboardTable, { Column } from '../../components/DashboardTable';

const ReservationsDashboard = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<ReservationDTO>({
    id: 0,
    userId: 0,
    rentalId: 0,
    carId: 0,
    startDate: '',
    endDate: '',
  });
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: reservations = [], error, isLoading, refetch } = useGetReservationsQuery();
  const { data: users = [] } = useGetUsersQuery();
  const { data: rentals = [] } = useGetRentalsQuery();
  const { data: cars = [] } = useGetCarsQuery();

  const [addReservation, { isLoading: isAdding }] = useAddReservationMutation();
  const [updateReservation, { isLoading: isUpdating }] = useUpdateReservationMutation();
  const [deleteReservation, { isLoading: isDeleting }] = useDeleteReservationMutation();

  const schema = yup.object().shape({
    userId: yup.number().required(),
    rentalId: yup.number().required(),
    carId: yup.number().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
  })

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ReservationDTO>({
    resolver: yupResolver(schema),
  });

  const handleEdit = (reservation: ReservationDTO) => {
    setModalShow(true);
    Object.keys(reservation).forEach((key) => setValue(key as keyof ReservationDTO, reservation[key as keyof ReservationDTO]));
  };

  const handleDelete = async (id: number) => {
    if (id) {
      try{
        await deleteReservation(id);
        refetch();
      } catch(err) {
        console.error('Error deleting reservation:', err);
      }
    } else {
        console.error('Reservation ID is missing!');
    }
  };

  const onSubmit = async (data: ReservationDTO) => {
    try{
      if(formData.id) {
        await updateReservation({ id: formData.id, reservation: data})
      } else {
        await addReservation(data);
      }
      setModalShow(false);
      refetch();
    } catch (err) {
      console.error('Error saving reservation:', err);
    }
  };

  const handleAddNew = () => {
    setFormData({
      id: 0,
      userId: 0,
      rentalId: 0,
      carId: 0,
      startDate: '',
      endDate: '',
    });
    setModalShow(true);
    reset();
  };

  const handleModalClose = () => {
    reset();
    setModalShow(false);
  }

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
      cell: (info) => {
        const user = info.getValue();
        return <span>{user?.usernameF || "Unknown"}</span>;
      },
    },
    {
      accessorKey: "rental",
      header: "Rental",
      enableSorting: true,
      cell: (info) => {
        const rental = info.getValue();
        return <span>{rental?.name || "Unknown"}</span>;
      },
    },
    {
      accessorKey: "car",
      header: "Car Reserved",
      enableSorting: true,
      cell: (info: any) => {
        const car = info.getValue();
        return <span>{car?.id || "Unknown"}</span>;
      },
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
        accessorKey: "price",
        header: "Reservation Price",
        enableSorting: true,
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
            onClick={() => handleEdit(info.row.original)}
            disabled={isUpdating}
            >
            Edit
        </Button>
        <Button
            variant="danger"
            onClick={() => handleDelete(info.row.original.id)}
            disabled={isDeleting}
            >
            Delete
        </Button>
        </div>
      ),
    },
  ];

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) =>
      Object.values(reservation)
        .join("")
        .toLowerCase()
        .includes(globalFilter.toLowerCase())
    );
  }, [reservations, globalFilter]);

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
                <Button className="d-flex align-items-center" variant="success" onClick={handleAddNew}>
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

      <DefaultModal
        show={modalShow}
        onHide={handleModalClose}
        title={formData.id ? 'Edit Reservation' : 'Add New Reservation'}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Select
              {...register("userId")}
              isInvalid={!!errors.userId}
            >
              <option value="">Select User</option>
              {users?.map(user => (
                <option key={user.id} value={user.id}>
                  {user.usernameF}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.userId?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Select
              {...register("carId")}
              isInvalid={!!errors.carId}
            >
              <option value="">Select Car</option>
              {cars?.map(car => (
                  <option key={car.id} value={car.id}>
                      {car.id}
                  </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.carId?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Select
              {...register("rentalId")}
              isInvalid={!!errors.rentalId}
            >
              <option value="">Select Rental</option>
              {rentals?.map(rental => (
                  <option key={rental.id} value={rental.id}>
                      {rental.name}
                  </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.rentalId?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              {...register("startDate")}
              isInvalid={!!errors.startDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.startDate?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              {...register("endDate")}
              isInvalid={!!errors.endDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.endDate?.message}
            </Form.Control.Feedback>
          </Form.Group>


          <Button className='mt-3' variant="success" type="submit" disabled={isAdding || isUpdating}>
            {isAdding || isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </DefaultModal>
    </div>
  );
};

export default ReservationsDashboard;
