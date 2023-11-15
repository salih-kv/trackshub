import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../Redux/slices/userSlice";
import Loading from "../Loading";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storageRef } from "../../firebase/firebase.config";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const [userInput, setUserInput] = useState(user);
  const [isDirty, setIsDirty] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const inputRef = useRef(null);

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

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const uploadFile = () => {
    if (inputRef.current.files.length > 0) {
      const img = inputRef.current.files[0];
      const imageRef = ref(storageRef, `images/${img.name}`);
      uploadBytes(imageRef, img)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setImageUrls([url]);
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

  const uploadedImage =
    imageUrls.length > 0 ? (
      <img src={imageUrls[0]} alt="Uploaded Image" />
    ) : null;

  console.log(imageUrls[0]);

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
                id="img"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={uploadFile}
              />
              <div className={`flex items-center justify-center w-40 h-40`}>
                <label htmlFor="img">
                  <div
                    id="imagePreview"
                    onClick={onButtonClick}
                    style={{ cursor: "pointer" }}
                  >
                    {uploadedImage ? (
                      uploadedImage
                    ) : (
                      <img
                        className="w-full h-auto rounded-full"
                        src={`https://ui-avatars.com/api/?name=${
                          user?.name
                        }&length=1&bold=true&background=${"B73D0D"}&color=fff&size=256`}
                        alt="user photo"
                      />
                    )}
                  </div>
                </label>
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

const Interests = () => {
  return (
    <section className="w-full">
      <header className="pb-8">
        <h1 className="text-2xl">Music Interests</h1>
      </header>
      <input placeholder="enter your musical interests..." className="input" />
    </section>
  );
};
