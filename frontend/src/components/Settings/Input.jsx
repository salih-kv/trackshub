export const Input = ({ type, label, placeholder, value, handleChange }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-3 mb-6 mt-2 rounded-lg bg-s-light dark:bg-s-dark focus:border focus:border-primary-500 outline-none placeholder:text-sm"
      />
    </>
  );
};
