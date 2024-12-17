import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Layout from "../components/layouts/Layout";

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <Layout>
            <ul className="nav nav-pills my-5 mb-3 justify-content-center" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                        data-mdb-pill-init
                        onClick={() => setActiveTab('login')}
                        href="#pills-login"
                        role="tab"
                        aria-controls="pills-login"
                        aria-selected={activeTab === 'login'}>
                        Login
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                        data-mdb-pill-init
                        onClick={() => setActiveTab('register')}
                        href="#pills-register"
                        role="tab"
                        aria-controls="pills-register"
                        aria-selected={activeTab === 'register'}>
                        Register
                    </a>
                </li>
            </ul>

            <div className="tab-content">
                <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''} fade-tab`}>
                    {activeTab === 'login' && <LoginForm />}
                </div>
                <div className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''} fade-tab`}>
                    {activeTab === 'register' && <RegisterForm />}
                </div>
            </div>
        </Layout>
    );
};

export default Login;
