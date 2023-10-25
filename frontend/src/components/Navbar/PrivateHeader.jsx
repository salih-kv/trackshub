import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import DarkThemeToggle from "./DarkThemeToggle";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import UserDropDown from "./UserDropDown";
import { useEffect, useRef, useState } from "react";
import ChatDropDown from "./ChatDropDown";
import NotificationDropDown from "./NotificationDropDown";
import ProfileImg from "../ProfileImg";
import instance from "../../axios/instance";
import { useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { selectUser } from "../../Redux/user/userSlice";

export const PrivateHeader = () => {
  const { user } = useSelector(selectUser);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef(null);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setSearchResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const SearchResults = () => (
    <div className="absolute top-16 right-0 z-20" ref={searchContainerRef}>
      <div className="rounded-lg shadow-lg bg-p-light dark:bg-s-dark min-w-[330px] text-sm p-2">
        {searchResults?.map((result) => (
          <Link to={`/${result.username}`} key={result._id}>
            <header className="flex items-center p-4 w-full rounded-md hover:bg-s-light dark:hover:bg-p-dark">
              <ProfileImg w={10} buttonStyle={`mr-4`} name={result?.name} />
              <div>
                <h4 className="font-bold">{result?.name}</h4>
                <p className="text-xs font-semibold text-gray-500">{`@${result?.username}`}</p>
              </div>
            </header>
          </Link>
        ))}
      </div>
    </div>
  );

  const transitionProps = {
    enter: `transition ease-out duration-300`,
    enterFrom: `transform opacity-0 scale-95`,
    enterTo: `transform opacity-100 scale-100`,
    leave: `transition ease-in duration-200`,
    leaveFrom: `transform opacity-100 scale-100`,
    leaveTo: `transform opacity-0 scale-95`,
  };

  return (
    <header className="bg-white py-2 dark:bg-p-dark dark:text-white fixed top-0 left-0 right-0 border-b dark:border-s-dark">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
        {/* Left */}
        <div className="pl-4 md:mr-8">
          {/* <Link to="/" className="flex items-center">
        <div className="w-40">
          <img src={logo} classNaFme="w-full" alt="TracksHub Logo" />
        </div>
      </Link> */}
          <Link
            to="/"
            className="logo-img flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <h2 className="text-2xl leading-6 text-black dark:text-white">
              TracksHub
            </h2>
          </Link>
        </div>
        {/* Middle */}
        <div className="hidden sm:block order-2 lg:order-1 mt-4 lg:mt-0 border dark:border-s-dark lg:border-none w-full lg:w-auto">
          <Nav />
        </div>
        {/* Right */}
        <div className="flex items-center space-x-3 lg:space-x-6 pr-4 order-1 lg:order-2">
          <form className="relative">
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchUsers();
              }}
              className="hidden md:block px-2 lg:px-4 py-2 rounded-3xl bg-s-light dark:bg-s-dark outline-none"
            />
            {searchResults?.length > 0 && <SearchResults />}
          </form>
          <DarkThemeToggle />
          <button
            className="header-btn"
            onClick={() => toggleDropdown("notification")}
          >
            <IoNotificationsOutline className="text-xl" />
            <Transition
              show={activeDropdown === "notification"}
              {...transitionProps}
            >
              {activeDropdown === "notification" && <NotificationDropDown />}
            </Transition>
          </button>
          <button
            className="header-btn hidden sm:block"
            onClick={() => toggleDropdown("chat")}
          >
            <AiOutlineComment className="text-xl" />
            <Transition show={activeDropdown === "chat"} {...transitionProps}>
              {activeDropdown === "chat" && <ChatDropDown />}
            </Transition>
          </button>
          <ProfileImg
            w={9}
            buttonStyle="px-2 relative"
            onClick={() => toggleDropdown("user")}
            name={user?.name}
          >
            <Transition show={activeDropdown === "user"} {...transitionProps}>
              {activeDropdown === "user" && <UserDropDown />}
            </Transition>
          </ProfileImg>
        </div>
      </div>
    </header>
  );
};
