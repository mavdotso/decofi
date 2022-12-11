import { motion } from "framer-motion";
import Header from "../header";
import Footer from "../footer";
import { Analytics } from '@vercel/analytics/react';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <motion.div key={children} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {children}
            </motion.div>
            <Analytics />
            <Footer />
        </>
    );
}
