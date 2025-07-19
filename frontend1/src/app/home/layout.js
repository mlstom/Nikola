import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StateContext } from "../context/StateContext";
export default async function HOMELayout({ children }) {

    return (
        <div>
            <StateContext >
                <ToastContainer />
                <Header />
                {children}
                <Footer />
            </StateContext >
        </div>
    );
}