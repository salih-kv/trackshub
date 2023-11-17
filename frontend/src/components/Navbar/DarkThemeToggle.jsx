import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const DarkThemeToggle = () => {
  const { theme, setTheme } = useTheme();

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
