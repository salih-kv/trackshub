import ProfileImg from "../ProfileImg";
import { Input } from "./Input";
import instance from "../../axios/instance";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    location: " ",
    bio: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field, newValue) => {
    setUserProfile((prev) => ({ ...prev, [field]: newValue }));
    setIsDirty(true);
  };

  const fetchProfile = async () => {
    try {
      const response = await instance.get("/api/v1/user/profile");
      console.log(response);
      setUserProfile(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/api/v1/user/profile", userProfile);
      setIsDirty(false);
    } catch (err) {
      toast.warning(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-3/4 flex flex-col max-w-2xl mx-auto mb-16">
      <section className="w-full">
        <header className="pb-8">
          <h1 className="text-2xl">Profile Settings</h1>
        </header>
        <form className="flex flex-col w-full gap-8">
          <div className="flex gap-12">
            <ProfileImg w={40} name={""} />
            <div className="">
              <Input label="Name" value={""} />
              <Input
                type={`text`}
                label={`Location`}
                placeholder={"Your City"}
                value={userProfile?.location}
                handleChange={(newValue) => handleChange("location", newValue)}
              />
            </div>
          </div>
          <div>
            <label>About</label>
            <textarea
              rows="6"
              className="resize-none w-full bg-s-light dark:bg-s-dark rounded-lg mt-2 outline-none p-3"
              value={userProfile?.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
            ></textarea>
          </div>
        </form>
      </section>
      <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
      <Interests />
      <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
      <div>
        <button
          className="btn btn-fill py-2 px-6 rounded-3xl"
          disabled={!isDirty}
          onClick={updateProfile}
        >
          Update
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;

const Interests = () => {
  return (
    <section className="w-full">
      <header className="pb-8">
        <h1 className="text-2xl">Music Interests</h1>
      </header>
      <Input placeholder={"enter your musical interests..."} />
    </section>
  );
};
