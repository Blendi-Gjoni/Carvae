import React, { useState, useEffect, Suspense } from 'react';
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetRentalsQuery,
  useGetRentalCitiesQuery,
  useGetRentalsByCityQuery,
  useAddRentalMutation,
  useUpdateRentalMutation,
  useDeleteRentalMutation,
} from '../../api/RentalsApi';
import { HiFilter, HiOutlinePlus } from 'react-icons/hi';
import { RiseLoader } from 'react-spinners';
const DashboardTable = React.lazy(() => import('../../components/DashboardTable'));

const RentalsDashboard = () => {
  const [ modalShow, setModalShow ] = useState(false);
  const [ formData, setFormData ] = useState({});
  const [ selectedCity, setSelectedCity ] = useState("");
  const [ globalFilter, setGlobalFilter ] = useState("");

  const { data: rentals = [], error, isLoading, refetch  } = useGetRentalsQuery();
  const { data: rentalCities = [], refetch: refetchRentalCities } = useGetRentalCitiesQuery();
  const { data: rentalsByCity = [], isLoading: isLoadingRentalsByCity, error: cityError } =
    useGetRentalsByCityQuery(selectedCity, {
      skip: selectedCity === "",
  });

  const [addRental, { isLoading: isAdding }] = useAddRentalMutation();
  const [updateRental, { isLoading: isUpdating }] = useUpdateRentalMutation();
  const [deleteRental, { isLoading: isDeleting }] = useDeleteRentalMutation();

  const schema = yup.object().shape({
    name: yup.string().required("Rental name is required!"),
    address: yup.string().required("Rental address is required!"),
    city: yup.string().required("Rental city is required!"),
    state: yup.string().required("Rental state is required!"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Rental phone number is required, and must contain only digits!")
      .required("Rental phone number is required!"),
    email: yup.string().email("Invalid email!").required("Rental email is required, and must be a valid email!"),
    website: yup.string().required("Rental website is required!"),
    openingHours: yup.string().required("Rental opening hours are required!"),
  });
  
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEdit = (rental) => {
    setModalShow(true);
    Object.keys(rental).forEach((key) => setValue(key, rental[key]));
  };  

  const handleDelete = async (id) => {
    if (id) {
      try {
        await deleteRental({ id });
        refetch();
        refetchRentalCities();
      } catch (err) {
        console.error('Error deleting rental:', err);
      }
    } else {
      console.error('Rental ID is missing');
    }
  };
  

  const onSubmit = async (data) => {
    try {
      if (formData.id) {
        await updateRental({ id: formData.id, ...data });
      } else {
        await addRental(data);
      }
      setModalShow(false);
      refetch();
      refetchRentalCities();
    } catch (err) {
      console.error('Error saving rental:', err);
    }
  };

  const handleAddNew = () => {
    setFormData({
      id: '',
      name: '',
      address: '',
      city: '',
      state: '',
      phoneNumber: '',
      email: '',
      website: '',
      openingHours: '',
    });
    setModalShow(true);
  };

  const handleModalClose = () => {
    reset();
    setModalShow(false);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    
    if(!city){
      refetch();
    }
  };

  const renderError = 
    (error || cityError) && (
      <p style={{color:'red'}}>
        Error: {error?.message || cityError?.message}
      </p>
    )

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "address",
      header: "Address",
      enableSorting: true,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "city",
      header: "City",
      enableSorting: true,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "state",
      header: "State",
      enableSorting: true,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "website",
      header: "Website",
      enableSorting: true,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "openingHours",
      header: "Opening Hours",
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableSorting: false,
      cell: (info) => (
        <div className='d-flex justify-content-around align-items-center'>
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

  const filteredRentals = rentals.filter((rental) =>
    Object.values(rental)
      .join("")
      .toLowerCase()
      .includes(globalFilter.toLowerCase())
  );

  const DelayedSuspense = ({ children }) => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setShowComponent(true), 500);
      return () => clearTimeout(timeout);
    }, []);

    return showComponent ? children : <div className='d-flex justify-content-center my-5'><RiseLoader color="#8f8f8f" size={10} /></div>
  };

  return (
    <>
      <h1 className='mb-4'><b>Rentals Dashboard</b></h1>

      {renderError}

      {isLoading ? (
        <p>Loading rentals...</p>
      ) : (
        <>
          <div className='container text-center'>
            <div className='row d-flex justify-content-between align-items-center gap-3'>
              <div className='col-12 col-sm-12 col-md-4 d-flex justify-content-center'>
                <Button className="d-flex align-items-center" variant='success' onClick={handleAddNew}>
                  <HiOutlinePlus />Add New Rental
                </Button>
              </div>
              <div className='col-12 col-sm-12 col-md-4 d-flex justify-content-center'>
                <div className='input-group'>
                  <input 
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    type='text' 
                    className='form-control' 
                    placeholder='Search...' 
                  />
                  <button className='btn btn-outline-dark' disabled><HiFilter className='text-dark'></HiFilter></button>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4 col-sm-12 col-md-12 ms-auto align-self-end">
                <select
                  className="form-select form-select-md my-3"
                  onChange={handleCityChange}
                  value={selectedCity}
                >
                  <option value="">All Rentals</option>
                  {rentalCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {isLoadingRentalsByCity ? (
            <p>Loading rentals by city...</p>
          ) : cityError ? (
            <p style={{ color: 'red' }}>Error: {cityError.message}</p>
          ) : (
            <DelayedSuspense>
              <Suspense>
                <DashboardTable
                  tableData={selectedCity && rentalsByCity.length ? rentalsByCity : filteredRentals}
                  allColumns={columns}
                  enableSort
                />
              </Suspense>
            </DelayedSuspense>
          )}
        </>
      )}

      <DefaultModal
        show={modalShow}
        onHide={handleModalClose}
        title={formData.id ? 'Edit Rental' : 'Add New Rental'}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              {...register("name")}
              isInvalid={!!errors.name}
              placeholder='Name'
            />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              {...register("address")}
              isInvalid={!!errors.address}
              placeholder='Address'
            />
            <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              {...register("city")}
              isInvalid={!!errors.city}
              placeholder='City'
            />
            <Form.Control.Feedback type='invalid'>{errors.city?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              {...register("state")}
              isInvalid={!!errors.state}
              placeholder='State'
            />
            <Form.Control.Feedback type='invalid'>{errors.state?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              {...register("phoneNumber")}
              isInvalid={!!errors.phoneNumber}
              placeholder='Phone Number'
            />
            <Form.Control.Feedback type='invalid'>{errors.phoneNumber?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              {...register("email")}
              isInvalid={!!errors.email}
              placeholder='Email'
            />
            <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              {...register("website")}
              isInvalid={!!errors.website}
              placeholder='Website'
            />
            <Form.Control.Feedback type='invalid'>{errors.website?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              {...register("openingHours")}
              isInvalid={!!errors.openingHours}
              placeholder='Opening Hours'
            />
            <Form.Control.Feedback type='invalid'>{errors.openingHours?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button className='mt-3' variant="success" type="submit" disabled={isAdding || isUpdating}>
            {isAdding || isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </DefaultModal>
    </>
  );
};

export default RentalsDashboard;
