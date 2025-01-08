import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AddCarForm from "../AddCarForm";

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <AddCarForm />
            <Footer />
        </div>
    );
};

export default Layout;