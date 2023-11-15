import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import * as Yup from "yup";
import instance from "../axios/instance";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required!"),
  });

  const handleForgotPassword = async (email) => {
    try {
      const response = await instance.post(
        "/api/v1/user/forgot-password",
        email
      );
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="p-20 min-h-screen w-screen flex flex-col gap-8 items-center justify-center bg-gray-200 dark:bg-p-dark relative">
      <div className="px-5 w-[420px]">
        <div className="text-center mb-16">
          <Link to="/welcome" className="text-3xl text-primary-500 font-bold">
            TracksHub
          </Link>
        </div>
        <p className="text-sm  dark:text-white">
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          <Form className="mt-6">
            <label>Email</label>
            <InputField
              type="text"
              id="userId"
              name="userId"
              placeholder="e.g. example@gmail.com"
              autoFocus
            />

            <button
              type="submit"
              className="w-full block btn btn-fill text-white font-semibold rounded-lg px-4 py-3 mt-4"
            >
              Reset
            </button>
          </Form>
        </Formik>
      </div>
      <div className="text-sm flex justify-between items-center mt-3">
        <p>Don&apos;t have an account?</p>
        <Link to="/register" className=" ml-3 text-primary-500 underline">
          Register
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
