import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import instance from "../../axios/instance";
import { logout } from "../../Redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../../Redux/slices/userSlice";
import Loading from "../Loading";

const Account = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="w-3/4 flex flex-col max-w-2xl mx-auto mb-16">
      <div className="w-full">
        <header className="pb-8">
          <h1 className="text-2xl">Account Settings</h1>
        </header>
        <UpdateAccount dispatch={dispatch} user={user} loading={loading} />
        <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
        <SetPassword user={user} />
        <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
        <DeleteAccount dispatch={dispatch} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Account;

const UpdateAccount = ({ dispatch, user, loading }) => {
  const [userInput, setUserInput] = useState(user);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const update = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(userInput));
    setIsDirty(false);
    dispatch(fetchUser());
  };

  useEffect(() => {
    if (!loading) {
      setUserInput(user);
    }
  }, [user, loading]);

  if (loading) return <Loading />;

  return (
    <form onSubmit={update}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        className="input"
        value={userInput?.username || ""}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="email"
        className="input"
        value={userInput?.email || ""}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="btn btn-fill py-2 px-6 rounded-3xl"
        disabled={!isDirty}
      >
        Update
      </button>
    </form>
  );
};

const SetPassword = () => {
  const [password, setPassword] = useState({
    newPassword: "",
    cNewPassword: "",
  });

  const passwordOnChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/api/v1/user/reset-password", {
        newPassword: password.newPassword,
      });
      toast.success(response.data.message);
      setPassword((prev) => ({ ...prev, newPassword: "", cNewPassword: "" }));
    } catch (err) {
      toast.warning(err.response.data.message);
    }
  };
  return (
    <form>
      <header className="pb-8">
        <h1 className="text-2xl">Set Password</h1>
      </header>
      <label htmlFor="newPassword">New password</label>
      <input
        type="text"
        id="newPassword"
        name="newPassword"
        placeholder="Enter at least 6 characters"
        className="input"
        value={password?.newPassword}
        onChange={passwordOnChange}
      />
      <label htmlFor="cNewPassword">Confirm password</label>
      <input
        type="text"
        id="cNewPassword"
        name="cNewPassword"
        placeholder="Re-enter your password"
        className="input"
        value={password?.cNewPassword}
        onChange={passwordOnChange}
      />
      <button
        type="submit"
        className="btn btn-fill py-2 px-6 rounded-3xl"
        onClick={resetPassword}
      >
        Reset
      </button>
    </form>
  );
};

const DeleteAccount = ({ dispatch }) => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const deleteAccount = async () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await instance.delete("/api/v1/user/account");
      dispatch(logout());
      navigate("/welcome");
    } catch (err) {
      toast.warning(err.response.data.message);
    }
  };
  return (
    <>
      <button
        onClick={deleteAccount}
        className="btn btn-secondary py-2 px-6 rounded-3xl"
      >
        Delete My Account
      </button>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white dark:bg-s-dark p-6 rounded-lg">
            <p>Are you sure you want to delete your account?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-secondary dark:bg-p-dark py-1.5 px-3 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="btn btn-fill ml-4 py-1.5 px-3 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
