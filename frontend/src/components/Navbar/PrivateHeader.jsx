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
import { selectUser } from "../../Redux/slices/userSlice";
import { RiSearch2Line } from "react-icons/ri";

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
        `/api/v1/user/search?q=${searchQuery}`
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
    <header className="header-container">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        {/* Logo */}
        <div className="md:mr-8 ml-4 xl:ml-0">
          <Link
            to="/"
            className="logo-img flex font-medium items-center text-gray-900"
          >
            <span className=" lg:text-2xl font-semibold leading-6 text-black dark:text-white">
              TracksHub
            </span>
          </Link>
        </div>
        {/* Nav */}
        <div className="hidden sm:block order-2 lg:order-1 mt-4 lg:mt-0 border dark:border-s-dark lg:border-none w-full lg:w-auto">
          <Nav />
        </div>
        {/* Nav Icons */}
        <div className="flex items-center space-x-3 lg:space-x-4 order-1 lg:order-2 mr-4 xl:mr-0">
          <form className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchUsers();
              }}
              className="hidden md:block px-4 pl-10 max-w-xs py-1 rounded-3xl bg-s-light dark:bg-s-dark outline-none placeholder:text-xs placeholder:text-gray-500"
            />
            <RiSearch2Line className="text-xl lg:text-base md:absolute top-1/4 left-4 text-gray-500" />
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
            w={7}
            buttonStyle="px-2 md:pl-2 md:px-0 relative"
            onClick={() => toggleDropdown("user")}
            name={user?.name}
            profileURL={user?.profilePic}
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
