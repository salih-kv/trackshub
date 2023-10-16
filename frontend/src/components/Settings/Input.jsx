export const Input = ({ label, placeholder, value }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className="w-full px-4 py-3 mb-6 mt-2 rounded-lg bg-s-light dark:bg-s-dark focus:border focus:border-primary-500 outline-none placeholder:text-sm"
      />
    </>
  );
};
