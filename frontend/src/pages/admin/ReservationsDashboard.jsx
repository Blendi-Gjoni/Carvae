import React, { useState } from 'react';
import { useGetUsersQuery } from '../../api/UsersApi';
import { useGetRentalsQuery } from '../../api/RentalsApi';
import { useGetCarsQuery } from '../../api/CarsApi';
import {
  useGetReservationsQuery,
  useAddReservationMutation,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
} from '../../api/ReservationsApi'
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiFilter, HiOutlinePlus } from 'react-icons/hi';
import { RiseLoader } from 'react-spinners';
import DashboardTable from '../../components/DashboardTable';

const ReservationsDashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: reservations = [], error, isLoading, refetch } = useGetReservationsQuery();
  const { data: users = [], refetch: refetchUsers } = useGetUsersQuery();
  const { data: rentals = [], refetch: refetchRentals } = useGetRentalsQuery();
  const { data: cars = [], refetch: refetchCars } = useGetCarsQuery();

  const [addReservation, { isLoading: isAdding }] = useAddReservationMutation();
  const [updateReservation, { isLoading: isUpdating }] = useUpdateReservationMutation();
  const [deleteReservation, { isLoading: isDeleting }] = useDeleteReservationMutation();

  const schema = yup.object().shape({
    userId: yup.number().required("You must select a User!"),
    rentalId: yup.number().required("You must select a Rental!"),
    carIds: yup
      .mixed()
      .test('is-valid-car-ids', 'Car IDs should be an array of numbers or a single number', (value) => {
        if (Array.isArray(value)) {
          return value.every((item) => typeof item === 'number' && !isNaN(item));
        } else if (typeof value === 'number' && !isNaN(value)) {
          return true;
        }
        return false;
      })
      .required("You must select at least one car!"),
    startDate: yup.date("You must select a valid date!").required("You must select a valid date!"),
    endDate: yup.date("You must select a valid date!").required("You must select a valid date"),
    status: yup.string().required("Reservation status is required!"),
  });

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      carIds: []
    }
  });

  const handleEdit = (reservation) => {
    setModalShow(true);
    setFormData(reservation);
    Object.keys(reservation).forEach((key) => setValue(key, reservation[key]));
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        await deleteReservation({ id });
        refetch();
        refetchUsers();
        refetchRentals();
        refetchCars();
      } catch (err) {
        console.error('Error deleting reservations:', err);
      }
    } else {
      console.error('Reservation ID is missing!');
    }
  };

  const onSubmit = async (data) => {
    try {
      let carIds = data.carIds;

      if (!Array.isArray(carIds)) {
        carIds = carIds ? [Number(carIds)] : [];
      } else {
        carIds = carIds.map(id => Number(id));
      }

      const payload = {
        ...data,
        carIds: carIds.length > 0 ? carIds : null,
      };

      if (formData.id) {
        await updateReservation({ id: formData.id, ...payload });
      } else {
        await addReservation(payload);
      }

      setModalShow(false);
      reset();
      refetch();
      refetchUsers();
      refetchRentals();
      refetchCars();
    } catch (err) {
      console.error('Error saving reservation:', err);
    }
  };

  const handleAddNew = () => {
    setFormData({
      id: '',
      userId: '',
      rentalId: '',
      carIds: [],
      startDate: '',
      endDate: '',
      status: '',
    });
    setModalShow(true);
  };

  const handleModalClose = () => {
    reset();
    setModalShow(false);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "userId",
      header: "User Email",
      enableSorting: true,
      cell: (info) => {
        const user = users.find((user) => user.id === info.getValue());
        return user ? user.email : "Unknown";
      },
    },
    {
      accessorKey: "carIds",
      header: "Cars Reserved",
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableSorting: false,
      cell: (info) => (
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

  const filteredReservations = reservations.filter((reservation) =>
    Object.values(reservation)
      .join("")
      .toLowerCase()
      .includes(globalFilter.toLowerCase())
  );

  return (
    <div>
      <h1>Reservations Dashboard</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

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
            <Form.Control
              as="select"
              {...register("userId")}
              isInvalid={!!errors.userId}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type='invalid'>{errors.userId?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              as="select"
              {...register("rentalId")}
              isInvalid={!!errors.rentalId}
            >
              <option value="">Select Rental</option>
              {rentals.map((rental) => (
                <option key={rental.id} value={rental.id}>
                  {rental.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type='invalid'>{errors.rentalId?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              as="select"
              {...register("carIds")}
              isInvalid={!!errors.carIds}
              multiple
              onChange={(e) => {
                const selectedValues = Array.from(e.target.selectedOptions, (option) =>
                  Number(option.value) // Convert to number
                );
                setValue("carIds", selectedValues, { shouldValidate: true });
              }}
            >
              <option value="">Select Cars</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.id}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type='invalid'>{errors.carIds?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder='Start Date'
              {...register("startDate")}
              isInvalid={!!errors.startDate}
            />
            <Form.Control.Feedback type='invalid'>{errors.startDate?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder='End Date'
              {...register("endDate")}
              isInvalid={!!errors.endDate}
            />
            <Form.Control.Feedback type='invalid'>{errors.startDate?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              as="select"
              {...register("status")}
              isInvalid={!!errors.status}
            >
              <option value="">Select Status</option>
              <option value="Reserved">Reserved</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid'>{errors.status?.message}</Form.Control.Feedback>
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
