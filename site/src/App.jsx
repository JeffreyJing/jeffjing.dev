import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavItem from "./components/NavItem";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Recruiters from "./pages/Recruiters";

export default function App() {
  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/for-recruiters", label: "For Recruiters" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-800 site-bg flex flex-col">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center text-xl md:text-2xl font-bold text-white">
              jeffjing<span className="text-green-400">.dev</span>
            </Link>

            {/* Hamburger */}
            <motion.button
              className="text-white text-2xl p-3 bg-white/5 hover:bg-white/10 rounded-md md:hidden transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1">
              {navLinks.map((link) => (
                <NavItem key={link.to} to={link.to} label={link.label} end={link.end} />
              ))}
            </div>
          </div>

          {/* Mobile dropdown nav */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-2 mt-4 pb-1">
                  {navLinks.map((link) => (
                    <NavItem
                      key={link.to}
                      to={link.to}
                      label={link.label}
                      end={link.end}
                      onClick={() => setMobileMenuOpen(false)}
                      layoutId="nav-pill-mobile"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main content */}
        <main className="flex-1 w-full pt-8 px-4 text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/for-recruiters" element={<Recruiters />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
