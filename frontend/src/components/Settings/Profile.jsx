import ProfileImg from "../ProfileImg";

const Profile = () => {
  return (
    <div className="flex items-start justify-center w-full max-w-2xl mx-auto">
      <div className="w-full">
        <header className="pb-8">
          <h1 className="text-2xl">Profile Settings</h1>
        </header>
        <form className="flex flex-col w-full gap-8">
          <div className="flex gap-8">
            <ProfileImg w={28} />
            <div className="flex flex-col">
              <Input label="Name" />
              <Input label="Location" placeholder="Your City" />
            </div>
          </div>
          <div>
            <label>About</label>
            <textarea
              rows="6"
              className="resize-none w-full bg-s-light dark:bg-s-dark rounded-lg mt-2 outline-none p-3"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

const Input = ({ label, placeholder, value }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className="w-full px-4 py-3 mb-6 mt-2 rounded-lg bg-s-light dark:bg-s-dark focus:border focus:border-primary-500 outline-none"
      />
    </>
  );
};
