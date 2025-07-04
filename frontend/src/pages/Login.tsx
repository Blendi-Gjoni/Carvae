import LoginForm from "../components/LoginForm";
import Layout from "../components/layouts/Layout";

const Login = () => {
    return (
        <Layout>
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <h2 className="mb-4" style={{ color: '#a4250b' }}>Login</h2>
                <LoginForm />
            </div>
        </Layout>
    );
};

export default Login;
