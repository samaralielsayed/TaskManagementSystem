import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ logged, handleLog }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const withouNavBarRoutes = ["/not-found", "/login", "/register"];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (withouNavBarRoutes.some((item) => location.pathname === item))
    return null;
  return (
    <div
      dir="ltr"
      className={`w-screen  m fixed z-50 mx-auto top-0 left-1/2 transform -translate-x-1/2 shadow-none flex ${
        isScrolled ? "bg-gray-100 dark:bg-main-700" : "bg-transparent"
      }`}
    >
      <nav className="w-full mx-auto flex justify-between items-center bg-transparent ">
        <div className="flex  justify-between mx-auto items-center w-full max-w-screen px-12 md:px-28 lg:px-16">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" className="w-[50px] md:w-[70px]" />
          </Link>
          <div className="flex items-center space-x-4">
            <DropDown logged={logged} handleLog={handleLog} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
