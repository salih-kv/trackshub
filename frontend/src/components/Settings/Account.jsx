import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import instance from "../../axios/instance";
import { useAuth } from "../../context/AuthContext";

const Account = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [userAccount, setUserAccount] = useState({
    username: "",
    email: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  const [password, setPassword] = useState({
    newPassword: "",
    cNewPassword: "",
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleChange = (field, newValue) => {
    setUserAccount((prev) => ({ ...prev, [field]: newValue }));
    setIsDirty(true);
  };

  const passwordOnChange = (field, newValue) => {
    setPassword((prev) => ({ ...prev, [field]: newValue }));
  };

  const fetchAccount = async () => {
    try {
      const response = await instance.get("/api/v1/user/account");
      setUserAccount(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateAccount = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/api/v1/user/account", userAccount);
      setIsDirty(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAccount = async () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await instance.delete("/api/v1/user/account");
      logout();
      navigate("/welcome");
    } catch (err) {
      console.error(err);
    }
  };

  const resetPassword = async () => {
    try {
      await instance.post("/api/reset-password", {
        newPassword: password.newPassword,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div className="w-3/4 flex flex-col max-w-2xl mx-auto mb-16">
      <div className="w-full">
        <header className="pb-8">
          <h1 className="text-2xl">Account Settings</h1>
        </header>
        <form onSubmit={updateAccount}>
          <Input
            type={"text"}
            label={"Username"}
            value={userAccount?.username}
            handleChange={(newValue) => handleChange("username", newValue)}
          />
          <Input
            type={"email"}
            label={"Email"}
            value={userAccount?.email}
            handleChange={(newValue) => handleChange("email", newValue)}
          />
          <button
            className="btn btn-fill py-2 px-6 rounded-3xl"
            disabled={!isDirty}
          >
            Update
          </button>
        </form>
        <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
        <form>
          <header className="pb-8">
            <h1 className="text-2xl">Set Password</h1>
          </header>
          <Input
            label={"New password"}
            placeholder={"Enter at least 6 characters"}
            handleChange={(newValue) =>
              passwordOnChange("newPassword", newValue)
            }
          />
          <Input
            label={"Confirm password"}
            placeholder={"Confirm password"}
            handleChange={(newValue) =>
              passwordOnChange("cNewPassword", newValue)
            }
          />
          <button
            className="btn btn-fill py-2 px-6 rounded-3xl"
            onClick={resetPassword}
          >
            Reset
          </button>
        </form>
        <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
        <button
          onClick={deleteAccount}
          className="btn btn-secondary py-2 px-6 rounded-3xl"
        >
          Delete My Account
        </button>

        {/* Delete confirmation modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white dark:bg-s-dark p-6 rounded-lg">
              <p>Are you sure you want to delete your account?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
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
      </div>
    </div>
  );
};

export default Account;
