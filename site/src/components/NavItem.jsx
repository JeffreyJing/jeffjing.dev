import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavItem({ to, label, onClick, end, layoutId = "nav-pill" }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className="relative block text-center px-4 py-2 rounded-full font-extrabold text-lg"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 bg-white rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span
            className={`relative z-10 transition-colors duration-200 ${
              isActive ? "text-black" : "text-white/80 hover:text-white"
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}
