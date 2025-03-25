import { useEffect, useMemo, useState } from 'react';
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    OrderDTO,
    Order,
    useAddOrderMutation,
    useDeleteOrderMutation,
    useGetOrdersWithPaginationQuery,
    useUpdateOrderMutation
} from '../../api/OrdersApi';
import { HiFilter, HiOutlinePlus } from 'react-icons/hi';
import { RiseLoader } from 'react-spinners';
import DashboardTable, { Column } from '../../components/DashboardTable';
import { useGetUsersQuery } from '../../api/UsersApi';
import { useGetDealershipsQuery } from '../../api/DealershipsApi';
import { useGetCarsQuery } from '../../api/CarsApi';

const OrdersDashboard = () => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [formData, setFormData] = useState<OrderDTO>({
        id: 0,
        carId: 0,
        userId: 0,
        dealershipId: 0,
    });
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [page, setPage] = useState(0);
    const [orderData, setOrderData] = useState<Order[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    
    const { data: ordersResponse, error, isLoading, refetch } = useGetOrdersWithPaginationQuery({ offset: page, pageSize: 10 });
    const { data: users = [] } = useGetUsersQuery();
    const { data: dealerships = [] } = useGetDealershipsQuery();
    const { data: cars = [] } = useGetCarsQuery();

    useEffect(() => {
        if(ordersResponse) {
            setOrderData(ordersResponse.content);
            setTotalPages(ordersResponse.totalPages);
        }
    }, [ordersResponse]);

    const [addOrder, { isLoading: isAdding }] = useAddOrderMutation();
    const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

    const schema = yup.object().shape({
        carId: yup.number().required(),
        userId: yup.number().required(),
        dealershipId: yup.number().required(),
    });

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<OrderDTO>({
        resolver: yupResolver(schema),
    });

    const handleEdit = (order: OrderDTO) => {
        setModalShow(true);
        Object.keys(order).forEach((key) => setValue(key as keyof OrderDTO, order[key as keyof OrderDTO]));
    };

    const handleDelete = async (id: number) => {
        if (id) {
            try{
                await deleteOrder(id);
                refetch();
            } catch(err) {
                console.error('Error deleting order:', err);
            }
        } else {
            console.error('Order ID is missing!');
        }
    }

    const onSubmit = async (data: OrderDTO) => {
        try{
            if(formData.id) {
                await updateOrder({ id: formData.id, order: data })
            } else {
                await addOrder(data);
            }
            setModalShow(false);
            refetch();
        } catch (err) {
            console.error('Error saving order:', err);
        }
    };

    const handleAddNew = () => {
        setFormData({
            id: 0,
            carId: 0,
            userId: 0,
            dealershipId: 0,
        });
        setModalShow(true);
    };

    const handleModalClose = () => {
        reset();
        setModalShow(false);
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

    const columns: Column<Order>[] = [
        {
            accessorKey: "id",
            header: "ID",
            enableSorting: false,
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: "user",
            header: "User",
            enableSorting: true,
            cell: (info) => {
                const user = info.getValue();
                return <span>{user?.usernameF || "Unknown"}</span>;
            },
        },
        {
            accessorKey: "car",
            header: "Car",
            enableSorting: true,
            cell: (info: any) => {
                const car = info.getValue();
                return <span>{car?.id || "Unknown"}</span>;
            },
        },
        {
            accessorKey: "dealership",
            header: "Dealership",
            enableSorting: true,
            cell: (info: any) => {
                const dealership = info.getValue();
                return <span>{dealership?.name || "Unknown"}</span>;
            },
        },
        {
            accessorKey: "orderDate",
            header: "Order Date",
            enableSorting: true,
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: "status",
            header: "Status",
            enableSorting: true,
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: "deliveryDate",
            header: "Delivery Date",
            enableSorting: true,
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: "price",
            header: "Order Price",
            enableSorting: true,
            cell: (info: any) => info.getValue(),
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

    const filteredOrders = useMemo(() => {
        return orderData.filter((order) =>
          Object.values(order)
            .join("")
            .toLowerCase()
            .includes(globalFilter.toLowerCase())
        );
      }, [orderData, globalFilter]);

    return (
        <div>
            <h1>Orders Dashboard</h1>

            {renderError}

            {isLoading ? (
                <div className='d-flex justify-content-center align-items-center vh-100'><RiseLoader color="#8f8f8f" size={10} /></div>
            ) : (
                <>
                <div className="container text-center my-3">
                    <div className="row d-flex justify-content-between align-items-center gap-3">
                    <div className="col-12 col-sm-12 col-md-4 d-flex justify-content-center">
                        <Button className="d-flex align-items-center" variant="success" onClick={handleAddNew}>
                        <HiOutlinePlus /> Add New Order
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
                    tableData={filteredOrders}
                    allColumns={columns}
                    enableSort
                    currentPage={page}
                    totalPages={totalPages}
                    fetchData={setPage}
                />
                </>
            )}

            
            <DefaultModal
                show={modalShow}
                onHide={handleModalClose}
                title={formData.id ? 'Edit Order' : 'Add New Order'}
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
                        <Form.Control.Feedback type="invalid">{errors.userId?.message}</Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">{errors.carId?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label></Form.Label>
                        <Form.Select
                            {...register("dealershipId")}
                            isInvalid={!!errors.dealershipId}
                        >
                            <option value="">Select Dealership</option>
                            {dealerships?.map(dealership => (
                                <option key={dealership.id} value={dealership.id}>
                                    {dealership.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.dealershipId?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Button className='mt-3' variant="success" type="submit" disabled={isAdding || isUpdating}>
                        {isAdding || isUpdating ? 'Saving...' : 'Save'}
                    </Button>
                </Form>
            </DefaultModal>
        </div>
    );
};

export default OrdersDashboard;
