import { Link } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { useState } from "react";

const DropDown = ({ handleLog }) => {
  const [show, setShow] = useState(false);

  const links = [
    { name: "profile", link: "/profile" },
    { name: "Home", link: "/" },
  ];

  return (
    <>
      <div className="relative ml-3" onClick={() => setShow((show) => !show)}>
        <div>
          <button
            type="button"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <RiMenu3Line size="2em" className="text-main-800" />
          </button>
        </div>
        <div
          className={`${
            show ? "block" : "hidden"
          } absolute right-0 z-20 mt-0 w-36 origin-top-right rounded-md bg-main-50 shadow-md py-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              className={`block px-4 py-2 text-sm text-main-800 font-medium`}
              role="menuitem"
              tabIndex={-1}
            >
              {link.name}
            </Link>
          ))}
          <Link
            className="block px-4 py-2 text-sm text-main-800 font-medium"
            role="menuitem"
            tabIndex={-1}
            to="/"
            onClick={handleLog}
          >
            logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default DropDown;
