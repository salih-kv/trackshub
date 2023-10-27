import NotAvailable from "../Error/NotAvailable";

const NotificationDropDown = () => {
  return (
    <div className="absolute top-10 right-0 rounded-lg shadow-lg bg-p-light dark:bg-s-dark">
      <div className="p-4">
        <div className="min-w-[280px]">
          <NotAvailable />
        </div>
      </div>
    </div>
  );
};

export default NotificationDropDown;
