import React, { useState } from 'react';
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';
import { 
  createColumnHelper, 
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  getPaginationRowModel } from '@tanstack/react-table';
import {
  useGetRentalsQuery,
  useAddRentalMutation,
  useUpdateRentalMutation,
  useDeleteRentalMutation,
} from '../../api/RentalsApi';
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";

const RentalsDashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({
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

  const { data: rentals = [], error, isLoading, refetch  } = useGetRentalsQuery();

  const [ sorting, setSorting ] = useState([]);
  const [ globalFilter, setGlobalFilter ] = useState("");

  const [addRental, { isLoading: isAdding }] = useAddRentalMutation();
  const [updateRental, { isLoading: isUpdating }] = useUpdateRentalMutation();
  const [deleteRental, { isLoading: isDeleting }] = useDeleteRentalMutation();

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (rental) => {
    setFormData(rental);
    setModalShow(true);
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        await deleteRental({ id });
        refetch();
      } catch (err) {
        console.error('Error deleting rental:', err);
      }
    } else {
      console.error('Rental ID is missing');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateRental({ id: formData.id, ...formData });
      } else {
        await addRental(formData);
      }
      setModalShow(false);
      refetch();
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

  // const handleSearchChange = (e) => {
  //   setRentalName(e.target.value);
  // };

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   const trimmedName = rentalName.trim();
  
  //   if (trimmedName) {
  //     setRentalName(trimmedName);
  //     refetchRentalByName(trimmedName);
  //   } else {
  //     console.error("Rental name is empty!");
  //   }
  // };

  const renderError = error && <p style={{ color: 'red' }}>Error: {error.message}</p>;

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      enableSorting:false,
      cell: (info) => info.getValue(),
      header: () => (
        <span className='d-flex align-items-center'>
          <b>ID</b>
        </span>
      ),
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className='d-flex align-items-center'>
          <b>Name</b>
        </span>
      ),
    }),
    columnHelper.accessor("address", {
      enableSorting:false,
      cell: (info) => info.getValue(),
      header: () => (
        <span className='d-flex align-items-center'>
          <b>Address</b>
        </span>
      ),
    }),
    columnHelper.accessor("city", {
      enableSorting:false,
      cell: (info) => info.getValue(),
      header: () => (
        <span className='d-flex align-items-center'>
          <b>City</b>
        </span>
      ),
    }),
    columnHelper.accessor("state", {
      enableSorting:false,
      cell: (info) => info.getValue(),
      header: () => (
        <span className='d-flex align-items-center'>
          <b>State</b>
        </span>
      ),
    }),
    columnHelper.accessor("phoneNumber", {
      enableSorting:false,
      cell: (info) => info.getValue(),
      header: () => (
        <span className='d-flex align-items-center'>
          <b>Phone</b>
        </span>
      ),
    }),
    columnHelper.accessor("website", {
      enableSorting:false,
      cell: (info) => info.getValue(),
      header: () => (
        <span className='d-flex align-items-center'>
          <b>Website</b>
        </span>
      ),
    }),
    columnHelper.accessor("openingHours", {
      enableSorting:false,
      cell: (info) => info.getValue(),
      header: () => (
        <span className='d-flex align-items-center'>
          <b>Opening Hours</b>
        </span>
      ),
    }),
    columnHelper.accessor("actions", {
      enableSorting:false,
      cell: (info) => (
        <>
          <Button
            variant="primary"
            onClick={() => handleEdit(info.row.original)}
            className="me-2"
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
        </>
      ),
      header: () => (
        <span className='d-fles align-items-center'>
          <b>Actions</b>
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data: rentals,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <h1>Rentals Dashboard</h1>

      {renderError}

      {isLoading ? (
        <p>Loading rentals...</p>
      ) : (
        <>
          <div className='container text-center m-3'>
            <div className='row justify-content-between'>
              <div className='col-12 col-sm-12 col-md-4 d-flex justify-content-center'>
                <Button className="" onClick={handleAddNew}>
                  Add New Rental
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
                  <button className='btn btn-outline-secondary'><HiSearch className='text-dark'></HiSearch></button>
                </div>
              </div>
            </div>
          </div>

          {/* <Form onSubmit={handleSearchSubmit}>
            <div className='input-group my-3'>
                <input 
                  value={rentalName}
                  onChange={handleSearchChange}
                  type="text"
                  className='form-control'
                  placeholder='Search Rentals by name...'
              />
              </div>  
          </Form> */}

          <div className='container'>
            <div className='row'>
              <div className='col-2 ms-auto align-self-end'>
                <select className='form-select form-select-sm my-3'>
                  <option selected>Select Rentals by City</option>
                  {rentals.map((rentals) => (
                    <option key={rentals.id} value={rentals.id}>
                      {rentals.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{overflowX: 'auto', maxWidth: '100%'}}>
            <table className="table table-hover mt-2">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        <div 
                          {...{
                            className: header.column.getCanSort()
                            ? "d-flex align-items-center cursor-pointer select-none text-dark hover:text-primary"
                            : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.id === 'name' && <HiOutlineSwitchVertical style={{cursor:'pointer'}} />}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <DefaultModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={formData.id ? 'Edit Rental' : 'Add New Rental'}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData.website}
              onChange={handleFormChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Opening Hours</Form.Label>
            <Form.Control
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleFormChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isAdding || isUpdating}>
            {isAdding || isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </DefaultModal>
    </>
  );
};

export default RentalsDashboard;
