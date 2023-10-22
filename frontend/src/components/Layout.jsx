import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PrivateHeader } from "./Navbar/PrivateHeader";
import Nav from "./Navbar/Nav";
import { fetchUser } from "../Redux/user/userSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/" || path === "/feed" || path === "/feed/") {
      navigate("/feed/trending");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="relative dark:text-white">
      <PrivateHeader />
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl mt-24 px-4">
        <Outlet />
      </div>
      {/* Bottom Nav */}
      <div className="absolute bottom-0 w-full shadow rounded-t-xl sm:hidden">
        <Nav />
      </div>
    </div>
  );
};

export default Layout;
