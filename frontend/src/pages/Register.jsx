import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { InputField } from "../components/InputField";
import instance from "../axios/instance";

export default function Register() {
  const navigate = useNavigate();

  // Form Validation
  const initialValues = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Required!")
      .min(8, "username must be at least 6 characters")
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

  return (
    <div className="p-20 min-h-screen w-screen flex flex-col-reverse gap-8 md:flex-row items-center justify-center bg-gray-200">
      {/* Left */}
      <div className="text-3xl text-center md:text-left">
        <Link
          to="/welcome"
          className="text-5xl text-primary-500 font-bold font-display mb-4"
        >
          TracksHub
        </Link>
        <p className="text-base">
          Connect with Artists around you on TracksHub.
        </p>
      </div>
      {/* Right */}
      <div className="mx-auto">
        <div className="bg-gray-100 p-5 flex rounded-2xl ">
          <div className="px-5 w-[400px]">
            <h2 className="text-2xl font-bold text-primary-700">Register</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form className="mt-6">
                <InputField
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  autoFocus
                />
                <InputField
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email Address"
                />
                <InputField
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                />
                <InputField
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Reenter Password"
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
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
              <FcGoogle className="text-2xl" />
              <span className="ml-4">SignUp with Google</span>
            </button>
            <div className="text-sm flex justify-between items-center mt-3">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-primary-400  "
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
