import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", theme);
    } else {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prevDark) => {
      if (prevDark === "dark") {
        return "light";
      } else {
        return "dark";
      }
    });
  };
  return (
    <>
      <div className="flex justify-center  items-center">
        <button
          className="hover:bg-s-light rounded-lg active:outline-none active:ring-2 active:ring-gray-200 dark:text-white dark:hover:bg-s-dark dark:active:ring-gray-600 p-2"
          id="toggleDark"
          onClick={toggleDarkMode}
        >
          {theme === "light" ? (
            <MdDarkMode className="text-xl" />
          ) : (
            <MdLightMode className="text-xl" />
          )}
        </button>
      </div>
    </>
  );
};

export default DarkThemeToggle;
