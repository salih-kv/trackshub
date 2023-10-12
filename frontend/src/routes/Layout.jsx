import { Outlet } from "react-router-dom";
import { PrivateHeader } from "../components/PrivateHeader";
import Nav from "../components/Nav";

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <PrivateHeader />
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
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
