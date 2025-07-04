import { Link } from 'react-router-dom';
import '../style/navbar.css'
import finallogo from '../assets/finallogo.png';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md bg-light">
            <div className="container-fluid">
                
                <Link to="/" className="nav-brand ms-5">
                    <img style={{width:'100px'}} src={finallogo} alt="Brand Logo"/>
                </Link>
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
                            <Link to="/login" className="nav-link">Log In</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Sign In</Link>
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
                                style={{borderRadius: '3px', width: '200px'}}
                            />
                        </form>
                        <div className="user-icons d-flex align-items-center">
                            <div className="account me-3">
                                <Link to="/user-profile" className="nav-link">
                                    <i className="bi bi-person"></i>
                                </Link>
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
                            <a href="mailto:info@carvae.com">info@carvae.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
