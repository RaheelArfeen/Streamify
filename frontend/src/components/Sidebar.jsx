import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon, MenuIcon, XIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", icon: <HomeIcon className="size-5 text-base-content opacity-70" />, label: "Home" },
    { to: "/friends", icon: <UsersIcon className="size-5 text-base-content opacity-70" />, label: "Friends" },
    { to: "/notifications", icon: <BellIcon className="size-5 text-base-content opacity-70" />, label: "Notifications" },
  ];

  return (
    <div className="relative">
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden p-3 fixed top-4 left-4 z-50 bg-base-200 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon className="size-6" />
      </button>

      {/* Sidebar Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`
          fixed md:sticky md:top-0 md:h-screen md:relative
          top-0 left-0 h-screen w-64 bg-base-200 border-r border-base-300 flex flex-col z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-base-300 flex justify-between items-center">
          <Link to="/" className="flex items-center md:gap-2.5 gap-2">
            <ShipWheelIcon className="size-8 md:size-9 text-primary" />
            <span className="md:text-3xl text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </Link>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <XIcon className="size-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === link.to ? "btn-active" : ""
                }`}
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
