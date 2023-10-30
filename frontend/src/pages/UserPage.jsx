import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsInstagram, BsSpotify, BsThreeDots } from "react-icons/bs";
import { IoChatbubblesSharp } from "react-icons/io5";
import { BiLinkAlt } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { PrivateHeader } from "../components/Navbar/PrivateHeader";
import {
  fetchNotLoggedInUser,
  followUser,
  selectUser,
} from "../Redux/user/userSlice";
import WelcomeHeader from "../components/Welcome/WelcomeHeader";
import ProfileImg from "../components/ProfileImg";

const UserPage = ({ currentUser, userProfile }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const isCurrentUser = currentUser._id === userProfile._id;
  const [isFollowing, setIsFollowing] = useState(false);
  const path = window.location.pathname;

  useEffect(() => {
    dispatch(fetchNotLoggedInUser(path));
  }, [dispatch, path]);

  const followersCount = userProfile?.followers?.length || 0;
  const followingCount = userProfile?.following?.length || 0;

  return (
    <div className="relative min-h-screen dark:bg-p-dark dark:text-white">
      {isLoggedIn ? <PrivateHeader /> : <WelcomeHeader isShow={true} />}
      <div className="w-full h-60 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-400"></div>
      <div className="flex gap-4 w-full justify-between mx-auto max-w-screen-2xl">
        <div className="w-1/4 relative z-10">
          <div className="bg-primary-50 dark:bg-primary-300 w-36 h-36 rounded-full absolute top-100 left-1/2 transform translate-x-[-50%] translate-y-[-50%]">
            <ProfileImg name={userProfile?.name} bg={`09ce82`} />
          </div>
          <div>
            <div className="pt-20 pb-4 px-4 flex flex-col items-center">
              <div>
                <h2 className="font-semibold text-2xl text-center">
                  {userProfile?.name}
                </h2>
                <h2 className="text-gray-600 text-sm flex items-center gap-2">
                  <div>{`@${userProfile?.username}`}</div>
                  <div className="font-extrabold w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div>{userProfile?.location}</div>
                </h2>
                <div className="flex gap-2 items-center justify-center mt-4">
                  <div className="w-6 h-6 rounded-full bg-s-light dark:bg-s-dark flex items-center justify-center">
                    <BiLinkAlt />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-s-light dark:bg-s-dark flex items-center justify-center">
                    <BsInstagram />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-s-light dark:bg-s-dark flex items-center justify-center">
                    <BsSpotify />
                  </div>
                </div>
              </div>
              {isCurrentUser ? (
                <div className="mt-5">
                  <Link
                    to="/settings/profile"
                    className="btn btn-secondary !text-primary-500 py-1.5 px-16 rounded-2xl"
                  >
                    <FiEdit3 />
                    <span className="ml-2">Edit</span>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-2 mt-5">
                  <Link className="btn py-1.5 px-4 rounded-2xl bg-primary-200  text-primary-500">
                    <IoChatbubblesSharp className="mr-1" />
                    Chat
                  </Link>
                  <button
                    onClick={() => {
                      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
                      dispatch(followUser(userProfile?._id));
                    }}
                    className={`btn py-1.5 px-4 rounded-2xl ${
                      isFollowing ? "btn-outlined" : "btn-fill"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                  <button className="btn bg-s-light dark:bg-s-dark px-4 rounded-2xl">
                    <BsThreeDots />
                  </button>
                </div>
              )}
              <div className="mt-4 flex gap-6">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-lg">{followersCount}</p>
                  <p className="text-sm font-medium text-gray-600">Followers</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-lg">{followingCount}</p>
                  <p className="text-sm font-medium text-gray-600">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Middle />
        <Right />
      </div>
    </div>
  );
};

export default UserPage;

const Middle = () => {
  const NavLinks = [
    {
      to: "",
      label: "Posts",
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
