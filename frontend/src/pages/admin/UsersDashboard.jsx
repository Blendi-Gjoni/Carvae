import React, { useState, useEffect } from 'react';
import UserApiService from '../../api/UserApiService';

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await UserApiService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users: ', err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Users Dashboard</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role?.name}</td>
              <td>
                <button className="btn btn-primary" disabled>Edit</button>
                <button className="btn btn-danger" disabled>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersDashboard;
