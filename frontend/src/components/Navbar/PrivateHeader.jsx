import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";

import DarkThemeToggle from "./DarkThemeToggle";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import UserDropDown from "./UserDropDown";
import { useContext, useEffect, useState } from "react";

import logo from "../../assets/trackshub.svg";
import ChatDropDown from "./ChatDropDown";
import NotificationDropDown from "./NotificationDropDown";
import ProfileImg from "../ProfileImg";
import { UserContext } from "../../context/UserContext";
import instance from "../../axios/instance";

export const PrivateHeader = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="bg-white py-2 dark:bg-p-dark dark:text-white fixed top-0 left-0 right-0 border-b dark:border-s-dark">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
        <Left />
        <div className="hidden sm:block order-2 lg:order-1 mt-4 lg:mt-0 border dark:border-s-dark lg:border-none w-full lg:w-auto">
          <Nav />
        </div>
        <Right user={user} />
      </div>
    </header>
  );
};

const Left = () => {
  return (
    <div className="pl-4 md:mr-8">
      {/* <Link to="/" className="flex items-center">
        <div className="w-40">
          <img src={logo} className="w-full" alt="TracksHub Logo" />
        </div>
      </Link> */}
      <Link
        to="/"
        className="logo-img flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <h2 className="font-display text-2xl leading-6 text-black dark:text-white">
          TracksHub
        </h2>
      </Link>
    </div>
  );
};

const Right = ({ user }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    const searchUsers = async () => {
      try {
        const response = await instance.get(
          `/api/v1/user/searchUser?q=${searchQuery}`
        );
        setSearchResults(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    searchUsers();
  }, [searchQuery]);

  return (
    <div className="flex items-center space-x-3 lg:space-x-6 pr-4 order-1 lg:order-2">
      <form className="relative">
        <input
          type="text"
          placeholder="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="hidden md:block px-2 lg:px-4 py-2 rounded-3xl dark:text-white bg-s-light dark:bg-s-dark focus:border-primary-500 outline-none"
        />
        {searchResults.length > 0 && (
          <div className="absolute top-16 right-0 z-20">
            <div className="rounded-lg shadow-lg bg-p-light dark:bg-s-dark min-w-[330px] text-sm p-2">
              {searchResults.map((result) => (
                <Link key={result._id}>
                  <header className="flex items-center p-4 w-full rounded-md dark:hover:bg-p-dark">
                    <ProfileImg
                      w={10}
                      buttonStyle={`mr-4`}
                      name={result?.name}
                    />
                    <div>
                      <h4 className="font-bold">{result?.name}</h4>
                      <p className="text-xs font-semibold text-gray-500">{`@${result?.username}`}</p>
                    </div>
                  </header>
                </Link>
              ))}
            </div>
          </div>
        )}
      </form>
      <DarkThemeToggle />
      <button
        className="relative hover:bg-s-light rounded-lg active:outline-none active:ring-2 active:ring-gray-200 dark:text-white dark:hover:bg-s-dark dark:active:ring-gray-600 p-2"
        onClick={() => toggleDropdown("notification")}
      >
        <IoNotificationsOutline className="text-xl" />
        {activeDropdown === "notification" && <NotificationDropDown />}
      </button>
      <button
        className="relative hidden sm:block hover:bg-s-light rounded-lg active:outline-none active:ring-2 active:ring-gray-200 dark:text-white dark:hover:bg-s-dark dark:active:ring-gray-600 p-2"
        onClick={() => toggleDropdown("chat")}
      >
        <AiOutlineComment className="text-xl" />
        {activeDropdown === "chat" && <ChatDropDown />}
      </button>
      <ProfileImg
        w={9}
        buttonStyle="px-2 relative"
        onClick={() => toggleDropdown("user")}
        name={user?.name}
      >
        {activeDropdown === "user" && <UserDropDown />}
      </ProfileImg>
    </div>
  );
};
