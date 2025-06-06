import { NavLink } from "react-router-dom";

export default function NavItem({ to, label }) {
  const base =
    "px-4 py-2 rounded font-extrabold text-xl transition-all duration-200";
  const active = "bg-white text-black";
  const inactive = "text-white hover:bg-white/10";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      style={{ color: isActive => (isActive ? undefined : "white") }}
    >
      {label}
    </NavLink>
  );
}