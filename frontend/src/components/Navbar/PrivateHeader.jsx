import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";

import DarkThemeToggle from "./DarkThemeToggle";
import { Link } from "react-router-dom";
import Nav from "./Nav";

export const PrivateHeader = () => {
  return (
    <header className="bg-white py-2 lg:py-4 dark:bg-p-dark dark:text-white fixed top-0 left-0 right-0 border-b dark:border-s-dark">
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
    <div>
      <Link href="" className="flex items-center pl-4 md:mr-8">
        {/* <img src="" className="mr-3 h-6 sm:h-9" alt="TracksHub Logo" /> */}
        <span className="self-center text-2xl font-semibold font-display whitespace-nowrap dark:text-white">
          TracksHub
        </span>
      </Link>
    </div>
  );
};

const Right = () => {
  return (
    <div className="flex items-center space-x-3 lg:space-x-6 pr-4 order-1 lg:order-2">
      <input
        type="text"
        placeholder="search"
        className="hidden md:block px-2 lg:px-4 py-1 rounded-3xl dark:text-black bg-s-light dark:bg-s-dark focus:border-primary-500 outline-none"
      />
      <DarkThemeToggle />
      <button className="hover:bg-s-light rounded-lg active:outline-none active:ring-2 active:ring-gray-200 dark:text-white dark:hover:bg-s-dark dark:active:ring-gray-600 p-2">
        <IoNotificationsOutline className="text-xl" />
      </button>
      <button className="hidden sm:block hover:bg-s-light rounded-lg active:outline-none active:ring-2 active:ring-gray-200 dark:text-white dark:hover:bg-s-dark dark:active:ring-gray-600 p-2">
        <AiOutlineComment className="text-xl" />
      </button>
      <button className="px-2">
        <img
          className="w-8 h-8 lg:w-9 lg:h-9 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </button>
    </div>
  );
};
