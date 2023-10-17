import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";

import DarkThemeToggle from "./DarkThemeToggle";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import UserDropDown from "./UserDropDown";
import { useState } from "react";

import logo from "../../assets/trackshub.svg";
import ChatDropDown from "./ChatDropDown";
import NotificationDropDown from "./NotificationDropDown";
import ProfileImg from "../ProfileImg";
import { useUserState } from "../../context/UserContext";

export const PrivateHeader = () => {
  return (
    <header className="bg-white py-2 dark:bg-p-dark dark:text-white fixed top-0 left-0 right-0 border-b dark:border-s-dark">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
        <Left />
        <div className="hidden sm:block order-2 lg:order-1 mt-4 lg:mt-0 border dark:border-s-dark lg:border-none w-full lg:w-auto">
          <Nav />
        </div>
        <Right />
      </div>
    </header>
  );
};

const Left = () => {
  return (
    <div className="pl-4 md:mr-8">
      <Link to="/" className="flex items-center">
        <div className="w-40">
          <img src={logo} className="w-full" alt="TracksHub Logo" />
        </div>
      </Link>
    </div>
  );
};

const Right = () => {
  const { user } = useUserState();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="flex items-center space-x-3 lg:space-x-6 pr-4 order-1 lg:order-2">
      <input
        type="text"
        placeholder="search"
        className="hidden md:block px-2 lg:px-4 py-2 rounded-3xl dark:text-white bg-s-light dark:bg-s-dark focus:border-primary-500 outline-none"
      />
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
