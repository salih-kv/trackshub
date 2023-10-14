import { TiSpanner } from "react-icons/ti";

const NotAvailable = () => {
  return (
    <div className="flex items-center justify-center w-full pt-36 bg-p-light dark:bg-p-dark">
      <div className="flex flex-col items-center gap-4 text-gray-500 uppercase dark:text-gray-400">
        <TiSpanner className="text-7xl" />
        <h1 className="tracking-widest">Under Development | Available Soon</h1>
      </div>
    </div>
  );
};

export default NotAvailable;
