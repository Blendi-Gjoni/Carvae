import { useState } from 'react';
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetDealershipsQuery,
  useAddDealershipMutation,
  useUpdateDealershipMutation,
  useDeleteDealershipMutation,
  Dealership,
  DealershipRequestDTO
} from '../../api/DealershipsApi';
import { HiFilter, HiOutlinePlus } from 'react-icons/hi';
import { RiseLoader } from 'react-spinners';
import DashboardTable, { Column } from '../../components/DashboardTable';

const DealershipsDashboard = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<DealershipRequestDTO>({
    id: 0,
    name: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
    email: '',
    website: '',
    openingHours: '',
    image: null,
  });
  const [selectedFile, setSelectedFile] = useState<string>("No file chosen");
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const { data: dealerships = [], error, isLoading, refetch } = useGetDealershipsQuery();

  const [addDealership, { isLoading: isAdding }] = useAddDealershipMutation();
  const [updateDealership, { isLoading: isUpdating }] = useUpdateDealershipMutation();
  const [deleteDealership, { isLoading: isDeleting }] = useDeleteDealershipMutation();

  const schema = yup.object().shape({
    name: yup.string().required("Dealership name is required!"),
    address: yup.string().required("Dealership address is required!"),
    city: yup.string().required("Dealership city is required!"),
    state: yup.string().required("Dealership state is required!"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Dealership phone number is required, and must contain only digits!")
      .required("Dealership phone number is required!"),
    email: yup.string().email("Invalid email!").required("Dealership email is required, and must be a valid email!"),
    website: yup.string().required("Dealership website is required!"),
    openingHours: yup.string().required("Dealership opening hours are required!"),
    image: yup
          .mixed<File>()
          .nullable()
          .notRequired(),
  });

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<DealershipRequestDTO>({
    resolver: yupResolver(schema),
  });

  const handleEdit = (dealership: DealershipRequestDTO) => {
    setModalShow(true);
    Object.keys(dealership).forEach((key) => setValue(key as keyof DealershipRequestDTO, dealership[key as keyof DealershipRequestDTO]));
  };

  const handleDelete = async (id: number) => {
    if (id) {
      try {
        await deleteDealership(id);
        refetch();
      } catch (err) {
        console.error('Error deleting dealership:', err);
      }
    } else {
      console.error('Dealership ID is missing!');
    }
  };

  const onSubmit = async (data: DealershipRequestDTO) => {
    try {
      const dealershipData: DealershipRequestDTO = {
        id: data.id,
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        openingHours: data.openingHours,
        image: data.image ?? null, 
      };
      await addDealership({ dealershipData, image: dealershipData.image as File}).unwrap();
      
      setModalShow(false);
      refetch();
    } catch (err) {
      console.error('Error saving dealership:', err);
    }
  };

  const handleAddNew = () => {
    setFormData({
      id: 0,
      name: '',
      address: '',
      city: '',
      state: '',
      phoneNumber: '',
      email: '',
      website: '',
      openingHours: '',
      image: null,
    });
    setModalShow(true);
  };

  const handleModalClose = () => {
    reset();
    setModalShow(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
  
    if (file) {
      setSelectedFile(file.name);
    } else {
      setSelectedFile("No file chosen")
    }
    
    setValue("image", file, { shouldValidate: true });
  };

  const renderError = error && (
    <p style={{ color: 'red' }}>
      Error: {
        'data' in error
         ? (error as { data: { message: string }}).data?.message || 'An unexpected error occurred!'
         : (error as { error: { message: string }}).error?.message || 'An unexpected error occurred!'
      }
    </p>
  );

  const columns: Column<Dealership>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: false,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "address",
      header: "Address",
      enableSorting: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "city",
      header: "City",
      enableSorting: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "state",
      header: "State",
      enableSorting: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      enableSorting: false,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "website",
      header: "Website",
      enableSorting: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "openingHours",
      header: "Opening Hours",
      enableSorting: false,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "imagePath",
      header: "Dealership image",
      enableSorting: false,
      cell: (info: any) => {
        const imageUrl = info.getValue();
        
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Dealership"
            style={{ width: "50px", height: "auto", objectFit: "cover" }}
          />
        ) : (
          <span>No Image</span>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Actions",
      enableSorting: false,
      cell: (info: any) => (
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

  const filteredDealerships = dealerships.filter((dealership) =>
    Object.values(dealership)
      .join("")
      .toLowerCase()
      .includes(globalFilter.toLowerCase())
  );

  return (
    <>
      <h1 className='mb-4'><b>Dealerships Dashboard</b></h1>

      {renderError}

      {isLoading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'><RiseLoader color="#8f8f8f" size={10} /></div>
      ) : (
        <>
          <div className="container text-center my-3">
            <div className="row d-flex justify-content-between align-items-center gap-3">
              <div className="col-12 col-sm-12 col-md-4 d-flex justify-content-center">
                <Button className="d-flex align-items-center" variant="success" onClick={handleAddNew}>
                  <HiOutlinePlus /> Add New Dealership
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
            tableData={filteredDealerships}
            allColumns={columns}
            enableSort
          />
        </>
      )}

      <DefaultModal
        show={modalShow}
        onHide={handleModalClose}
        title={formData.id ? 'Edit Dealership' : 'Add New Dealership'}
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

          <Form.Group className="mb-3">
                      <Form.Label>Dealership Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        ref={(e: any) => register("image").ref(e)} 
                        isInvalid={!!errors.image}
                        onChange={handleFileChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.image?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

          <Button className='mt-3' variant="success" type="submit" disabled={isAdding || isUpdating}>
            {isAdding || isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </DefaultModal>
    </>
  );
};

export default DealershipsDashboard;
