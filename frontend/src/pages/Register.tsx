import RegisterForm from "../components/RegisterForm";
import Layout from "../components/layouts/Layout";

const Register = () => {
    return (
        <Layout>
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <h2 className="mb-4" style={{ color: '#a4250b' }}>Register</h2>
                <RegisterForm />
            </div>
        </Layout>
    );
};

export default Register;
