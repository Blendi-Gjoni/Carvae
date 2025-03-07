import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/authSlice';
import { AppDispatch } from '../redux/store';
import '../style/UserProfile.css';
import Layout from '../components/layouts/Layout';
import { useGetCurrentUserQuery } from '../api/UsersApi';

const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { data: user , isLoading } = useGetCurrentUserQuery();

  const handleSignOut = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  }

  return (
    <Layout>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container vh-100 mt-5">
          <div className="row gutters">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="account-settings">
                    <div className="user-profile" style={{textAlign: 'center'}}>
                      <div className="user-avatar">
                        <img
                          style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '100px'
                          }}
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Maxwell Admin"
                        />
                      </div>
                      <h5 className="user-name">{user?.usernameF || "Username not available"}</h5>
                      <h6 className="user-email">{user?.email}</h6>
                    </div>
                    <div className="about">
                      <h5>About</h5>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, aspernatur doloribus.
                      </p>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <button className='btn btn-outline-dark' onClick={handleSignOut}>Sign Out</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="custom-user-profile-bg card-body d-flex flex-column justify-content-between" style={{height: '300px'}}>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2" style={{color: '#fd3a3a'}}><b>Personal Details</b></h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="fullName" style={{color: '#ffffff'}}>Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          value={user?.usernameF || "Username not available!"}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="eMail" style={{color: '#ffffff'}}>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={user?.email || "Email not available!"}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="phone" style={{color: '#ffffff'}}>User Role</label>
                        <input
                          type="text"
                          className="form-control"
                          id="role"
                          value={user?.role?.name || "Role not available!"}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="d-flex justify-content-around text-right gap-4">
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn btn-outline-secondary"
                          style={{width: '100%'}}
                          disabled
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn"
                          style={{width: '100%', backgroundColor: '#ff0000', color: '#ffffff'}}
                          disabled
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default UserProfile;