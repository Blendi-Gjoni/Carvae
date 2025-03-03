import Layout from '../components/layouts/Layout';
import { useGetCurrentUserQuery } from '../api/UsersApi';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const { data: user , isLoading } = useGetCurrentUserQuery();

  return (
    <Layout>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container vh-100 mt-5">
          <motion.div 
            className="row gutters"
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.5}}  
          >
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body d-flex flex-column justify-content-between" style={{height: '300px'}}>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2" style={{color: '#a4250b'}}><b>Personal Details</b></h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="fullName">Username</label>
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
                        <label htmlFor="eMail">Email</label>
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
                        <label htmlFor="phone">User Role</label>
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
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn"
                          style={{width: '100%', backgroundColor: '#ff0000', color: '#ffffff'}}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}

export default UserProfile;