import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { login } from "../Redux/slices/authSlice";
import instance from "../axios/instance";

const OAuth = ({ buttonText }) => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await instance.post("/api/v1/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
      });
      dispatch(login(response.data.token));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-white dark:bg-s-dark dark:text-white border dark:border-s-dark py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 "
    >
      <FcGoogle className="text-2xl" />
      <span className="ml-4">{buttonText}</span>
    </button>
  );
};

export default OAuth;
