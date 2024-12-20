import React from "react";
import { Link } from 'react-router-dom';
import '../style/navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="..." alt="Brand Logo" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Link
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Log In</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/page" className="nav-link">Dashboard</Link>
                        </li>
                    </ul>
                    <div className="search-and-icons">
                        <form className="d-flex mb-2 me-4" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                aria-label="Search"
                                placeholder="Search"
                            />
                        </form>
                        <div className="user-icons d-flex align-items-center">
                            <div className="account me-3">
                                <i className="bi bi-person"></i>
                            </div>
                            <div className="wishlist me-3">
                                <i className="bi bi-heart"></i>
                            </div>
                            <div className="cart">
                                <i className="bi bi-cart3"></i>
                            </div>
                        </div>
                    </div>
                    <div className="contact-info">
                        <p>+9876543210 | +1234567890</p>
                        <p>
                            <a href="mailto:contact@domainname.com">contact@domainname.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
