import React from "react";
import Layout from "../components/layouts/Layout";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBIcon, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import '../style/UserProfile.css';
import { useGetCurrentUserQuery } from "../api/UsersApi";
import { motion } from "framer-motion";
import UserProfileCardBGPhoto from "../assets/user-profile-bg-ferrari-pic.jpg"

const UserProfile = () => {
  const { data: user, isLoading, error } = useGetCurrentUserQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return (
    <>
      <Layout>
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <motion.div
                initial={{ scale: 1, rotateX: 180 }}
                animate={{ scale: 1, rotateX: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 30,
                  damping: 10,
                  duration: 0.2
                }}
                className="col-lg-8 mb-4 mb-lg-0"
              >
                <MDBCard className="mb-3" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                  <MDBRow 
                    className="profile-bg-row" 
                    style={{
                      backgroundImage: `url(${UserProfileCardBGPhoto})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '300px',
                      borderTopLeftRadius: '1rem',
                      borderTopRightRadius: '1rem'
                    }}
                  >
                  </MDBRow>
                  <MDBRow className="g-0">
                    <MDBCol md="4" className="gradient-custom text-center text-white col-lg d-flex flex-column justify-content-evenly align-items-center">
                        <MDBIcon fas icon="user-astronaut" fluid size="5x" />
                      <MDBTypography tag="h5">{user?.usernameF || 'Username not available'}</MDBTypography>
                      <MDBIcon far icon="edit" style={{cursor: "pointer"}} />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="strong">Information</MDBTypography>
                        <hr className="" />
                        <MDBRow className="py-1">
                          <MDBCol size="6" className="my-2">
                            <MDBInput 
                              label="Email"
                              value={user?.email || 'Email not available'}
                              id="typeEmail" 
                              type="email"
                            />
                          </MDBCol>
                          <MDBCol size="6" className="my-2">
                            <MDBInput
                              label="Phone"
                              value={'### ### ###'}
                              id="formControlReadOnly"
                              type="text"
                              readonly
                            />
                          </MDBCol>
                        </MDBRow>
                        <hr className="" />
                        <MDBRow className="py-1">
                          <MDBCol size="6" className="my-2"> 
                              <MDBInput
                                label="Username"
                                value={user?.usernameF || 'Username not available'}
                                id="typeUsername"
                                type="text"
                              />
                            </MDBCol>
                          <MDBCol size="6" className="my-2">
                            <MDBInput
                              label="Role"
                              value={user?.role?.name || 'Role not available'}
                              id="formControlReadOnly"
                              type="text"
                              readonly
                            />
                          </MDBCol>
                        </MDBRow>
                        <hr className="" />
                        <MDBRow className="py-1 d-flex align-items-center">
                          <MDBCol size="6" className="my-2 d-flex flex-row align-items-center">
                          <MDBBtn className='me-1' style={{backgroundColor: '#FF2800'}}>
                            SAVE CHANGES
                          </MDBBtn>
                          <MDBBtn className='me-1' style={{color: '#FF2800', backgroundColor: '#fff'}}>
                            RESTORE CHANGES
                          </MDBBtn>
                          </MDBCol>
                          <MDBCol size="6" className="my-2">
                            <div className="d-flex justify-content-end align-items-center">
                              <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" style={{color: "#FF2800"}} /></a>
                              <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" style={{color: "#FF2800"}} /></a>
                              <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" style={{color: "#FF2800"}} /></a>
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </motion.div>
            </MDBRow>
          </MDBContainer>
        </section>
      </Layout>
    </>
  )
}

export default UserProfile;