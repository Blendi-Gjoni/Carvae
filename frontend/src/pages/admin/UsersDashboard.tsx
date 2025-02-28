import { useGetUsersQuery } from '../../api/UsersApi';

const UsersDashboard = () => {
  const { data: users = [], error } = useGetUsersQuery();

  const renderError = error && (
    <p style={{ color: 'red' }}>
      Error: {
        'data' in error
          ? (error as { data: { message: string } }).data?.message || 'An unexpected error occurred.'
          : (error as { error: { message: string } }).error?.message || 'An unexpected error occurred.'
      }
    </p>
  );

  return (
    <div>
      <h1>Users Dashboard</h1>

      {renderError}

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
              <td>{user.usernameF}</td>
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
