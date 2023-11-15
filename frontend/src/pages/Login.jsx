import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import * as Yup from "yup";
import instance from "../axios/instance";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/slices/authSlice";
import OAuth from "../components/OAuth";

export default function Login() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    userId: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("Required!"),
    password: Yup.string().min(6).max(12).required("Required!"),
  });

  const handleLogin = async (user) => {
    try {
      const response = await instance.post("/api/v1/auth/login", user);
      response.data.status && dispatch(login(response.data.token));
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    isLoggedIn && navigate("/feed");
  }, [isLoggedIn, navigate]);

  return (
    <div className="px-20 min-h-screen w-screen flex flex-col-reverse gap-8 md:flex-row items-center justify-center bg-gray-200 dark:bg-p-dark relative">
      {/* Left */}
      <div className="text-3xl text-center md:text-left min-w-[400px]">
        <Link
          to="/welcome"
          className="text-5xl text-primary-500 font-bold  mb-4"
        >
          TracksHub
        </Link>
        <p className="text-base dark:text-white">
          Welcome, Login to your TracksHub account.
        </p>
      </div>
      {/* Right */}
      <div className="mx-auto">
        <div className="flex rounded-2xl ">
          <div className="w-[420px]">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form className="mt-6">
                <InputField
                  type="text"
                  id="userId"
                  name="userId"
                  placeholder="Email or username"
                  autoFocus
                />
                <InputField
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-700 hover:text-primary-500 flex justify-end mt-2"
                >
                  Forgot password?
                </Link>
                <button
                  type="submit"
                  className="w-full block btn btn-fill text-white font-semibold rounded-lg px-4 py-3 mt-6"
                >
                  Login
                </button>
              </Form>
            </Formik>
            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>
            <OAuth buttonText="Login with Google" />
            <div className="text-sm flex justify-between items-center mt-3">
              <p>Don&apos;t have an account?</p>
              <Link
                to="/register"
                className="py-2 px-5 ml-3 bg-white dark:bg-s-dark dark:text-white border dark:border-s-dark rounded-xl hover:scale-105 duration-300 border-primary-400  dark:hover:text-primary-500"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
