import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-dropdown-select";
import { fetchUser, updateUser } from "../../Redux/slices/userSlice";
import { FaCamera } from "react-icons/fa";
import Loading from "../Loading";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storageRef } from "../../firebase/firebase.config";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const [userInput, setUserInput] = useState(user);
  const [isDirty, setIsDirty] = useState(false);

  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInput((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
    setUserInput((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const uploadFile = () => {
    if (inputRef.current.files.length > 0) {
      const img = inputRef.current.files[0];
      const imageRef = ref(storageRef, `images/${img.name}`);
      uploadBytes(imageRef, img)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setUserInput((prev) => ({ ...prev, profilePic: url }));
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const update = async (e) => {
    e.preventDefault();
    uploadFile();
    await dispatch(updateUser(userInput));
    setIsDirty(false);
    dispatch(fetchUser());
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setUserInput(user);
    }
  }, [user, loading]);

  if (loading) return <Loading />;

  return (
    <div className="w-3/4 flex flex-col max-w-2xl mx-auto mb-16">
      <section className="w-full">
        <header className="pb-8">
          <h1 className="text-2xl">Profile Settings</h1>
        </header>
        <form className="flex flex-col w-full gap-8">
          <div className="flex gap-12">
            <div>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                name="profilePic"
                onChange={handleChange}
                hidden
              />
              <div
                id="imagePreview"
                onClick={() => inputRef.current.click()}
                className="flex items-center justify-center w-40 h-40 rounded-full cursor-pointer relative group"
              >
                <img
                  className="w-full h-auto rounded-full object-cover"
                  src={userInput?.profilePic}
                  alt="user photo"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible bg-black bg-opacity-60 w-full h-full rounded-full flex items-center justify-center">
                  <FaCamera className="text-3xl text-gray-200" />
                </div>
              </div>
            </div>

            <div className="">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Display name"
                className="input"
                value={userInput?.name || ""}
                onChange={handleChange}
              />
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Your City"
                className="input"
                value={userInput?.location || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label>About</label>
            <textarea
              rows="6"
              className="resize-none w-full bg-s-light dark:bg-s-dark rounded-lg mt-2 outline-none p-3"
              name="bio"
              value={userInput?.bio || ""}
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </section>
      <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
      <Links />
      <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
      <Interests />
      <div className="w-full h-[1px] my-12 bg-s-light dark:bg-s-dark"></div>
      <div>
        <button
          className="btn btn-fill py-2 px-6 rounded-3xl"
          disabled={!isDirty}
          onClick={update}
        >
          Update
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;

const Links = () => {
  return (
    <section>
      <header className="pb-8">
        <h1 className="text-2xl">Links</h1>
      </header>
      <div>
        <label>Spotify</label>
        <input type="text" placeholder="Add profile URL" className="input" />
        <label>Instagram</label>
        <input type="text" placeholder="Add profile URL" className="input" />
        <label>YouTube</label>
        <input type="text" placeholder="Add profile URL" className="input" />
        <label>Website</label>
        <input type="text" placeholder="Add profile URL" className="input" />
      </div>
    </section>
  );
};

const Interests = () => {
  const genres = [
    {
      value: 1,
      label: "Rock",
    },
    {
      value: 2,
      label: "Pop",
    },
    {
      value: 3,
      label: "Hip Hop",
    },
    {
      value: 4,
      label: "Electronic",
    },
    {
      value: 5,
      label: "Jazz",
    },
    {
      value: 6,
      label: "Folk",
    },
    {
      value: 7,
      label: "Latin",
    },
    {
      value: 8,
      label: "Classical",
    },
    {
      value: 9,
      label: "Punk",
    },
    {
      value: 10,
      label: "Blues",
    },
    {
      value: 11,
      label: "Metal",
    },
    {
      value: 12,
      label: "K-Pop",
    },
    {
      value: 13,
      label: "Lo-fi",
    },
    {
      value: 14,
      label: "Dance & EDM",
    },
    {
      value: 15,
      label: "Country",
    },
    {
      value: 16,
      label: "Other",
    },
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <section className="w-full">
      <header className="pb-8">
        <h1 className="text-2xl">Music Interests</h1>
      </header>
      <Select
        placeholder="enter your musical interests..."
        multi
        create
        color="#774eff"
        dropdownPosition="auto"
        options={genres}
        value={selectedGenres}
        onChange={(values) => setSelectedGenres(values)}
        className="my-dropdown input dark:text-black !border-none !ring-0 !px-2 !py-3 !rounded-lg"
      />
    </section>
  );
};
