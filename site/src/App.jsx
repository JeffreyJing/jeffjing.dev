import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavItem from "./components/NavItem";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Recruiters from "./pages/Recruiters";

export default function App() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/for-recruiters", label: "For Recruiters"},
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-800 flex flex-col">
        {/* Navbar */}
        <nav className="w-full bg-black px-4 py-4 shadow z-10">
          <div className="flex justify-between items-center">
            <div className="text-xl md:text-2xl font-bold text-white">jeffjing.dev</div>
            <button
  className="bg-gray-800 !bg-gray-800 text-white p-2 rounded-md md:hidden border border-gray-700 hover:!bg-gray-700"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
  ☰
</button>


            <div className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <NavItem key={link.to} to={link.to} label={link.label} />
              ))}
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="flex flex-col gap-4 mt-4 md:hidden">
              {navLinks.map((link) => (
                <NavItem
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
            </div>
          )}
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
      </div>
    </Router>
  );
}
