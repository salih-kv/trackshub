import { useEffect, useState } from "react";
import { Input } from "./Input";
import instance from "../../axios/instance";

const Account = () => {
  const [userAccount, setUserAccount] = useState({
    username: "",
    email: "",
  });

  const handleChange = (field, newValue) => {
    setUserAccount((prev) => ({ ...prev, [field]: newValue }));
  };

  useEffect(() => {
    instance
      .get("/api/v1/user/account")
      .then((res) => setUserAccount(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-3/4 flex flex-col max-w-2xl mx-auto mb-16">
      <div className="w-full">
        <header className="pb-8">
          <h1 className="text-2xl">Account Settings</h1>
        </header>
        <form>
          <Input
            label={"Username"}
            value={userAccount?.username}
            handleChange={(newValue) => handleChange("username", newValue)}
          />
          <Input
            label={"Email"}
            value={userAccount?.email}
            handleChange={(newValue) => handleChange("email", newValue)}
          />
        </form>
        <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
        <form>
          <header className="pb-8">
            <h1 className="text-2xl">Set Password</h1>
          </header>
          <Input
            label={"New password"}
            placeholder={"Enter at least 6 characters"}
          />
          <Input label={"Confirm password"} placeholder={"Confirm password"} />
        </form>
        <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
        <button className="btn btn-secondary py-2 px-6 rounded-3xl">
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Account;
