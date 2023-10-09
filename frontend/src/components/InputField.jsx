import { ErrorMessage, Field } from "formik";

export const InputField = ({ type, id, name, placeholder, ...rest }) => {
  return (
    <div>
      <Field
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        {...rest}
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-4 mb-1 border focus:border-primary-500 focus:bg-white focus:outline-none"
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <div style={{ color: "red", fontSize: "12px", marginLeft: "1rem" }}>
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};
