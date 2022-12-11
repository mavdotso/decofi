import { motion } from "framer-motion";
import Header from "../header";
import Footer from "../footer";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {children}
            </motion.div>
            <Footer />
        </>
    );
}
