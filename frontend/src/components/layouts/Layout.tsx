import Navbar from "../Navbar";
import Footer from "../Footer";

interface LayoutProps extends React.PropsWithChildren {
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;