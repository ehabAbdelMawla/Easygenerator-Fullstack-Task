import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

export default function AnimatedLayout() {
    const location = useLocation(); // Detects route changes

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: "-25%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "50%" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}

            >
                <Outlet />
            </motion.div>
        </AnimatePresence>
    );
}
