import { useState } from "react";
import { Link } from "react-router-dom";

function WelcomeHeader({ isShow }) {
  const [show, setShow] = useState(isShow || false);

  return (
    <header className="text-gray-600 font-body fixed-header">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div>
          <Link
            to="/"
            className="logo-img flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <h2 className="font-display text-2xl leading-6 text-gray-800">
              TracksHub
            </h2>
          </Link>
        </div>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLinkItem to="/" text="About" />
          <NavLinkItem to="/" text="Integration" />
          <NavLinkItem to="/" text="Features" />
          <NavLinkItem to="/" text="Docs" />
        </nav>
        {show && (
          <nav>
            <NavLinkItem to="/login" text="Login" />
            <Link
              to="/register"
              className="btn btn-gradient py-2 px-3 rounded "
            >
              Sign up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavLinkItem({ to, text }) {
  return (
    <Link
      to={to}
      className="mr-5 hover:text-gray-900 text-black cursor-pointer"
    >
      {text}
    </Link>
  );
}

export default WelcomeHeader;
