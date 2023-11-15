import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PrivateHeader } from "./Navbar/PrivateHeader";
import Nav from "./Navbar/Nav";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/" || path === "/feed" || path === "/feed/") {
      navigate("/feed/following");
    }
  }, [navigate]);

  return (
    <div className="relative dark:text-white">
      <PrivateHeader />
      <div className="flex justify-between items-center mx-auto max-w-screen-xl mt-14 lg:mt-16">
        <Outlet />
      </div>
      {/* Bottom Nav */}
      <div className="fixed bottom-0 z-40 w-full shadow rounded-t-xl sm:hidden dark:bg-s-dark">
        <Nav />
      </div>
    </div>
  );
};

export default Layout;
