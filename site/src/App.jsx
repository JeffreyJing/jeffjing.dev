import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-800 flex flex-col">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full bg-black px-8 py-4 flex justify-between items-center shadow z-10">
          <div className="text-2xl font-bold text-white">jeffjing.dev</div>
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} />
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 w-full pt-20 px-6 text-white">
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
