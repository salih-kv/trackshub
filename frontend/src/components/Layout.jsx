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
      <div className="flex justify-between items-center mx-auto max-w-screen-2xl mt-14 sm:mt-20 lg:mt-16 px-4 xxl:px-0">
        <Outlet />
      </div>
      {/* Bottom Nav */}
      <div className="fixed bottom-0 z-40 w-full drop-shadow-2xl sm:hidden bg-white dark:bg-p-dark">
        <Nav />
      </div>
    </div>
  );
};

export default Layout;
