import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "All files", to: "#", current: true },
  { name: "Audio files", to: "#", current: false },
  { name: "Text files", to: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Files = () => {
  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-600">
              Filter by
              <BiChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-32 origin-top-left rounded-md bg-white dark:bg-s-dark shadow-2xl outline-none">
                <div className="py-1">
                  {sortOptions?.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <Link
                          to={option.to}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900 dark:text-s-light"
                              : "text-gray-500",
                            active ? "bg-gray-100 dark:bg-p-dark" : "",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div>
          <button className="btn btn-fill py-1.5 px-3 rounded-lg">
            Upload files
          </button>
        </div>
      </header>
      <section className="mt-4">
        <header>
          {/* checkbox */}
          {/* Name */}
          {/* Uploaded */}
        </header>
        <div>
          <File />
        </div>
      </section>
    </div>
  );
};

export default Files;

const File = () => {
  return (
    <div>
      <input type="checkbox" name="" id="" />
      <div>
        <div>{/* file type icon */}</div>
        <div>{/* filename */}</div>
        <div>{/* uploaded date */}</div>
        <div>{/* ... more */}</div>
      </div>
    </div>
  );
};
