import { useEffect, useState } from "react";

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
      <button
        onClick={toggleDarkMode}
        className="w-12 h-6 rounded-full p-1 bg-soft-blue relative transition-colors duration-500 ease-in focus:outline-none border "
      >
        <div className="rounded-full w-4 h-4 bg-primary-500 relative ml-0 dark:ml-6 pointer-events-none transition-all duration-300 ease-out"></div>
      </button>
    </>
  );
};

export default DarkThemeToggle;
