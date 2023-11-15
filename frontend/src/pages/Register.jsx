import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../components/InputField";
import instance from "../axios/instance";
import OAuth from "../components/OAuth";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Register() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Form Validation
  const initialValues = {
    username: "",
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Required!")
      .min(6, "username must be at least 6 characters")
      .matches(/^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$/, {
        message: "Invalid username format",
        excludeEmptyString: true,
      })
      .test(
        "no-underscore-hyphen-end",
        "Username cannot end with _ or -",
        (value) => {
          if (value && (value.endsWith("_") || value.endsWith("-"))) {
            return false;
          }
          return true;
        }
      ),
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email").required("Required!"),
    password: Yup.string().min(4).max(12).required("Required!"),
  });

  const handleRegister = async (user) => {
    try {
      const response = await instance.post("/api/v1/auth/signup", user);
      response.data.status && navigate("/login");
    } catch (err) {
      console.log("Error: ", err.response.data);
    }
  };

  useEffect(() => {
    isLoggedIn && navigate("/feed");
  }, [isLoggedIn, navigate]);

  return (
    <div className="px-20 min-h-screen w-screen flex flex-col-reverse gap-8 md:flex-row items-center justify-center bg-gray-200 dark:bg-p-dark">
      {/* Left */}
      <div className="text-3xl text-center md:text-left min-w-[400px]">
        <Link
          to="/welcome"
          className="text-5xl text-primary-500 font-bold mb-4"
        >
          TracksHub
        </Link>
        <p className="text-base dark:text-white">
          Connect with Artists around you on TracksHub.
        </p>
      </div>
      {/* Right */}
      <div className="mx-auto">
        <div className="flex rounded-2xl ">
          <div className="w-[420px]">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form className="mt-6">
                <div className="flex gap-4">
                  <InputField
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    autoFocus
                  />
                  <InputField
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <InputField
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
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
                  Register
                </button>
              </Form>
            </Formik>
            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>
            <OAuth buttonText="SignUp with Google" />
            <div className="text-sm flex justify-between items-center mt-3">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="py-2 px-5 ml-3 bg-white dark:bg-s-dark border dark:border-s-dark rounded-xl hover:scale-105 duration-300 border-primary-400 dark:hover:text-primary-500 "
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
