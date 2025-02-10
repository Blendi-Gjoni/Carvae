import React, { useState, useEffect } from 'react';
import OrderApiService from '../../api/OrderApiService';
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';

const OrdersDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [formData, setFormData] = useState({
        orderId: '',
        deliveryDate: '',
        status: '',
        dealership: ''
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await OrderApiService.getAllOrders();
            setOrders(data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err.message);
        }
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (order) => {
        setFormData({
            orderId: order.orderId,
            deliveryDate: order.deliveryDate,
            status: order.status,
        });
        setModalShow(true);
    };

    const handleDelete = async (id) => {
        try {
            await OrderApiService.deleteOrder(id);
            fetchOrders();
        } catch (err) {
            console.error('Error deleting order:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.orderId) {
                // Update existing order
                await OrderApiService.updateOrder(formData.orderId, formData);
            }
            setModalShow(false);
            fetchOrders();
        } catch (err) {
            console.error('Error saving order:', err);
        }
    };

    return (
        <div>
            <h1>Orders Dashboard</h1>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Car</th>
                    <th scope="col">Dealership</th>
                    <th scope="col">User Email</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Delivery Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.orderId}>
                        <th scope="row">{order.orderId}</th>
                        <td>{order.car.model.name}</td>
                        <td>{order.dealership.name}</td>
                        <td>{order.user.email}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.deliveryDate}</td>
                        <td>{order.status}</td>
                        <td>{order.price}</td>
                        <td>
                            {/*<Button*/}
                            {/*    variant="primary"*/}
                            {/*    onClick={() => handleEdit(order)}*/}
                            {/*    className="me-2"*/}
                            {/*>*/}
                            {/*    Edit*/}
                            {/*</Button>*/}
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(order.orderId)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for Edit */}
            <DefaultModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title="Edit Order"
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Delivery Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleFormChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </DefaultModal>
        </div>
    );
};

export default OrdersDashboard;
