import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { PrivateHeader } from "../components/Navbar/PrivateHeader";
import WelcomeHeader from "../components/Welcome/WelcomeHeader";
import { useAuth } from "../context/AuthContext";
import { BiLinkAlt } from "react-icons/bi";
import { BsInstagram, BsSpotify, BsThreeDots } from "react-icons/bs";
import { IoChatbubblesSharp } from "react-icons/io5";
import { useEffect } from "react";

const UserPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { userId } = useParams();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === `/${userId}` || path === `/${userId}/`) {
      navigate(`/${userId}/activity`);
    }
  }, [navigate, userId]);
  return (
    <div className="relative min-h-screen dark:bg-p-dark dark:text-white">
      {isLoggedIn ? <PrivateHeader /> : <WelcomeHeader isShow={true} />}
      <div className="w-full h-60 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-400"></div>
      <div className="flex gap-4 w-full justify-between mx-auto max-w-screen-2xl">
        <Left />
        <Middle />
        <Right />
      </div>
    </div>
  );
};

export default UserPage;

const Left = () => {
  return (
    <div className="w-1/4 relative">
      <div className="bg-primary-50 dark:bg-primary-300 w-36 h-36 rounded-full absolute top-100 left-1/2 transform translate-x-[-50%] translate-y-[-50%]"></div>
      <div>
        <div className="pt-20 pb-4 px-4 flex flex-col items-center">
          <div>
            <h2 className="font-semibold text-2xl text-center">Name</h2>
            <h2 className="text-gray-600 text-sm">
              {" "}
              <span>@username</span>{" "}
              <span className="font-extrabold">&#183;</span>{" "}
              <span>Location</span>
            </h2>
            <div className="flex gap-2 items-center justify-center mt-4">
              <div className="w-6 h-6 rounded-full bg-s-light flex items-center justify-center">
                <BiLinkAlt />
              </div>
              <div className="w-6 h-6 rounded-full bg-s-light flex items-center justify-center">
                <BsInstagram />
              </div>
              <div className="w-6 h-6 rounded-full bg-s-light flex items-center justify-center">
                <BsSpotify />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <Link className="btn py-1.5 px-4 rounded-2xl bg-primary-200  text-primary-500">
              <IoChatbubblesSharp className="mr-1" />
              Chat
            </Link>
            <Link className="btn py-1.5 px-4 rounded-2xl btn-fill">Follow</Link>
            <button className="btn bg-s-light px-4 rounded-2xl">
              <BsThreeDots />
            </button>
          </div>
          <div className="mt-4 flex gap-6">
            <div className="flex flex-col items-center">
              <p className="font-semibold text-lg">0</p>
              <p className="text-sm font-medium text-gray-600">Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-lg">0</p>
              <p className="text-sm font-medium text-gray-600">Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Middle = () => {
  const NavLinks = [
    {
      to: "activity",
      label: "Activity",
    },
    {
      to: "tracks",
      label: "Tracks",
    },
    {
      to: "playlists",
      label: "Playlists",
    },
  ];
  return (
    <div className="w-2/4">
      <header className="flex gap-8 pt-12">
        {NavLinks?.map(({ to, label }) => (
          <div key={to} className="group/link hover:bg-slate-100">
            <Link
              to={to}
              className="text-gray-500 font-medium hover:text-black"
            >
              {label}
            </Link>
            <div className="w-8 h-[3px] bg-black invisible group-hover/link:visible"></div>
          </div>
        ))}
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

const Right = () => {
  return (
    <div className="w-1/4">
      <header className="pt-12"></header>
    </div>
  );
};
