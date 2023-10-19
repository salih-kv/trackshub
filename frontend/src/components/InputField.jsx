import { ErrorMessage, Field } from "formik";

export const InputField = ({ label, type, id, name, placeholder, ...rest }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <Field
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        {...rest}
        className="input"
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
