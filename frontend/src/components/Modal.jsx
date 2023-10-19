const Modal = ({ children, toggle, setToggle }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white dark:bg-p-dark p-6 rounded-lg">{children}</div>
    </div>
  );
};

export default Modal;
