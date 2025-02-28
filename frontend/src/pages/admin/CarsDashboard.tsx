import { useState } from 'react';
import {CarDTO,Car, useGetCarsQuery, useDeleteCarMutation, useUpdateCarMutation, useAddCarMutation} from '../../api/CarsApi';
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form, FormControlProps } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormSubmitHandler } from 'react-hook-form';


const CarsDashboard = () => {
    const { data: cars = [], error, refetch} = useGetCarsQuery();
    const [modalShow, setModalShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CarDTO>({
        id: 0,
        modelId: 0,
        year: 0,
        horsepower: 0,
        kilometers: 0,
        description: '',
        exterior: '',
        interior: '',
        fuelType: '',
        transmission: '',
        categoryId: 0,
        features: [],
        carType: '',
        price: 0,
    });

    const [addCar] = useAddCarMutation();
    const [deleteCar] = useDeleteCarMutation();
    const [updateCar] = useUpdateCarMutation();


    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (car: CarDTO) => {
        setFormData({
            ...car,
            id: car.id
        });
        setModalShow(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCar(id);
            refetch();
        } catch (err) {
            console.error('Error deleting car:', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await updateCar({id: formData.id, car: formData});
            } else {
                await addCar(formData);
            }
            setModalShow(false);
            refetch();
        } catch (err) {
            console.error('Error saving car:', err);
        }
    };


    const handleAddNew = () => {
        navigate('/admin/add-car');
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

    return (
        <div>
            <h1>Cars Dashboard</h1>

            {renderError}

            <Button className="mb-3" onClick={handleAddNew}>
                Add New Car
            </Button>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Model</th>
                    <th scope="col">Year</th>
                    <th scope="col">Horsepower</th>
                    <th scope="col">Kilometers</th>
                    <th scope="col">Description</th>
                    <th scope="col">Exterior</th>
                    <th scope="col">Interior</th>
                    <th scope="col">Fuel Type</th>
                    <th scope="col">Transmission</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {cars.map((car) => (
                    <tr key={car.id}>
                        <th scope="row">{car.id}</th>
                        <td>{car.model.name}</td>
                        <td>{car.year}</td>
                        <td>{car.horsepower}</td>
                        <td>{car.kilometers}</td>
                        <td>{car.description}</td>
                        <td>{car.exterior}</td>
                        <td>{car.interior}</td>
                        <td>{car.fuelType}</td>
                        <td>{car.transmission}</td>
                        <td>{car.category.name}</td>
                        <td>{car.price}</td>
                        <td>
                            {/*<Button*/}
                            {/*    variant="primary"*/}
                            {/*    onClick={() => handleEdit(car)}*/}
                            {/*    className="me-2"*/}
                            {/*>*/}
                            {/*    Edit*/}
                            {/*</Button>*/}
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(car.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for Add/Edit */}
            <DefaultModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={formData.id ? 'Edit Car' : 'Add New Car'}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Model ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="modelId"
                            value={formData.modelId}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Horsepower</Form.Label>
                        <Form.Control
                            type="number"
                            name="horsepower"
                            value={formData.horsepower}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Kilometers</Form.Label>
                        <Form.Control
                            type="number"
                            name="kilometers"
                            value={formData.kilometers}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Exterior</Form.Label>
                        <Form.Control
                            type="text"
                            name="exterior"
                            value={formData.exterior}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Interior</Form.Label>
                        <Form.Control
                            type="text"
                            name="interior"
                            value={formData.interior}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Fuel Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="fuelType"
                            value={formData.fuelType}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Transmission</Form.Label>
                        <Form.Control
                            type="text"
                            name="transmission"
                            value={formData.transmission}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Car Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="carType"
                            value={formData.carType}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
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

export default CarsDashboard;
