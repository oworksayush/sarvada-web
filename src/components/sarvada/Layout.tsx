import { ReactNode } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, overlay = true }: { children: ReactNode; overlay?: boolean }) => (
  <div className="min-h-screen overflow-x-clip">
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:px-4 focus:py-2">Skip to content</a>
    <Header overlay={overlay} />
    <motion.main id="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      {children}
    </motion.main>
    <Footer />
  </div>
);
export default Layout;
