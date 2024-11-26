import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="bg-light py-3 py-md-5 py-xl-8 border-top border-light-subtle">
                <div className="container overflow-hidden">
                    <div className="row gy-3 gy-md-5 gy-xl-0 align-items-sm-center">
                        <div className="col-xs-12 col-sm-6 col-xl-3 order-0 order-xl-0">
                            <div className="footer-logo-wrapper text-center text-sm-start">
                                <a href="#!">
                                    <img
                                        src="./assets/img/bsb-logo.svg"
                                        alt="Carvae Logo"
                                        width="175"
                                        height="57"
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="col-xs-12 col-xl-6 order-2 order-xl-1">
                            <ul className="nav justify-content-center">
                                {["About", "Contact", "Advertise", "Terms", "Privacy"].map(
                                    (item) => (
                                        <li className="nav-item" key={item}>
                                            <a
                                                className="nav-link link-secondary px-2 px-md-3"
                                                href="#!"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-xl-3 order-1 order-xl-2">
                            <div className="social-media-wrapper">
                                <ul className="list-unstyled m-0 p-0 d-flex justify-content-center justify-content-sm-end">
                                    {[
                                        {icon: "bi-facebook", href: "#!"},
                                        {icon: "bi-youtube", href: "#!"},
                                        {icon: "bi-twitter", href: "#!"},
                                        {icon: "bi-instagram", href: "#!"},
                                    ].map(({icon, href}) => (
                                        <li className="me-3" key={icon}>
                                            <a href={href}
                                               className={`bi ${icon} fs-4 link-dark link-opacity-75-hover`}/>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-light py-3 py-md-5 border-top border-light-subtle">
                <div className="container overflow-hidden">
                    <div className="row">
                        <div className="col">
                            <div className="footer-copyright-wrapper text-center">
                                &copy; 2024. All Rights Reserved.
                            </div>
                            <div className="credits text-secondary text-center mt-2 fs-8">
                                Built by{" "}
                                <a
                                    href="#"
                                    className="link-secondary text-decoration-none"
                                >
                                    carvae.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
