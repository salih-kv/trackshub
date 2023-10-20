import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import * as Yup from "yup";
import instance from "../axios/instance";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const { login, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  // Form Validation
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
      response.data.status && login(response.data.token);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    isLoggedIn && navigate("/feed");
  }, [isLoggedIn, navigate]);

  return (
    <div className="p-20 min-h-screen w-screen flex flex-col-reverse gap-8 md:flex-row items-center justify-center bg-gray-200 dark:bg-p-dark relative">
      {/* Left */}
      <div className="text-3xl text-center md:text-left">
        <Link
          to="/welcome"
          className="text-5xl text-primary-500 font-bold font-display mb-4"
        >
          TracksHub
        </Link>
        <p className="text-base dark:text-white">
          Welcome, Login to your TracksHub account.
        </p>
      </div>
      {/* Right */}
      <div className="mx-auto">
        <div className="bg-gray-100 dark:bg-s-dark p-5 flex rounded-2xl ">
          <div className="px-5 w-[400px]">
            <h2 className="text-2xl font-bold text-primary-700 text-center">
              Login
            </h2>
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
            <button className="bg-white dark:bg-p-dark dark:text-white border dark:border-p-dark py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
              <FcGoogle className="text-2xl" />
              <span className="ml-4">Login with Google</span>
            </button>
            <div className="text-sm flex justify-between items-center mt-3">
              <p>Don&apos;t have an account?</p>
              <Link
                to="/register"
                className="py-2 px-5 ml-3 bg-white dark:bg-p-dark dark:text-white border dark:border-p-dark rounded-xl hover:scale-110 duration-300 border-primary-400  "
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
