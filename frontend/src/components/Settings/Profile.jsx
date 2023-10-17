import { useState } from "react";
import ProfileImg from "../ProfileImg";
import { Input } from "./Input";
import instance from "../../axios/instance";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  return (
    <div className="w-3/4 flex flex-col max-w-2xl mx-auto mb-16">
      <section className="w-full">
        <header className="pb-8">
          <h1 className="text-2xl">Profile Settings</h1>
        </header>
        <form className="flex flex-col w-full gap-8">
          <div className="flex gap-12">
            <ProfileImg w={40} />
            <div className="">
              <Input label="Name" value={user?.name} />
              <Input
                label="Location"
                placeholder="Your City"
                value={user?.location}
              />
            </div>
          </div>
          <div>
            <label>About</label>
            <textarea
              rows="6"
              className="resize-none w-full bg-s-light dark:bg-s-dark rounded-lg mt-2 outline-none p-3"
              value={user?.about}
            ></textarea>
          </div>
        </form>
      </section>
      <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
      <Interests />
      <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
      <div>
        <button className="btn btn-fill py-2 px-6 rounded-3xl" disabled>
          Update
        </button>
      </div>
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
    </section>
  );
};
