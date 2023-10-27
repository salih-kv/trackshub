import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileImg from "../ProfileImg";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  createNewPost,
  getPosts,
  selectPost,
} from "../../Redux/post/postSlice";
import { selectUser } from "../../Redux/user/userSlice";
import { storageRef } from "../../firebase/firebase.config";
import { AudioPlayer } from "react-audio-player-component";
import { Post } from "../Post";
import Loading from "../Loading";

const Following = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(selectUser);
  const { posts } = useSelector(selectPost);

  console.log("following", user);

  const latestPosts = posts
    ? posts
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 1)
    : [];

  useEffect(() => {
    if (!loading) {
      dispatch(getPosts());
      console.log("user", user);
    }
  }, [dispatch]);

  if (loading || !user) return <Loading />;

  return (
    <div className="flex flex-col gap-6">
      <CreatePost />
      {latestPosts?.map((post, index) => (
        <Post key={index} user={user} post={post} />
      ))}
      <div>{/* render following users posts */}</div>
    </div>
  );
};

export default Following;

const CreatePost = () => {
  const [postToggle, setPostToggle] = useState(false);
  const dispatch = useDispatch();
  const [postInput, setPostInput] = useState("");

  const handleInputChange = (e) => {
    setPostInput(e.target.value);
  };

  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioLoading(true);

    // Preview the selected file
    const reader = new FileReader();
    reader.onload = () => {
      setAudioURL(reader.result);
      setAudioLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (audioFile) {
      const audioRef = storageRef.child(audioFile.name);
      audioRef.put(audioFile).then(() => {
        console.log("uploaded");
        // get the download url for the uploaded file
        audioRef.getDownloadURL().then((url) => {
          console.log("URL:", url);
        });
      });
    } else {
      console.log("No file selected for upload");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <ProfileImg w={10} buttonStyle={`mr-3`} />
      <div className="w-full">
        <input
          type="text"
          className="bg-s-light dark:bg-s-dark w-full py-3 px-6 rounded-3xl placeholder:text-gray-500 outline-none"
          placeholder="What's new?"
          readOnly={true}
          onClick={() => setPostToggle((prev) => !prev)}
        />
      </div>
      {postToggle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-p-dark p-6 rounded-lg w-[650px]">
            <div className="flex items-center justify-between w-full mb-3">
              <div className="flex items-center">
                <ProfileImg w={10} buttonStyle={`mr-3`} />
                <div>
                  <h2 className="text-sm">Username</h2>
                  <p className="text-xs text-blue-gray-300">Posting to Feed</p>
                </div>
              </div>
              <div>
                <IoMdCloseCircleOutline
                  onClick={() => setPostToggle(false)}
                  className="text-red-500 text-2xl cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <textarea
                rows="2"
                className="bg-s-light dark:bg-s-dark w-full p-4 rounded-t-xl placeholder:text-gray-500 resize-none outline-none"
                placeholder="What's new?"
                value={postInput}
                onChange={handleInputChange}
              />
              <div className="bg-s-light dark:bg-s-dark p-4 rounded-b-xl">
                {audioFile && audioLoading ? (
                  <>...</>
                ) : (
                  audioFile && (
                    <AudioPlayer
                      src={audioURL}
                      minimal={true}
                      width={570}
                      trackHeight={35}
                      backgroundColor="#1C1C26"
                      barColor="#262831"
                      barPlayedColor="#774EFF"
                      seekBarColor="#774EFF"
                      hideSeekBar={true}
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <input
                type="file"
                id="uploads"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="uploads"
                className="btn btn-secondary !text-primary-500 py-1.5 px-3 rounded-2xl cursor-pointer"
              >
                Audio
              </label>
              <button
                onClick={() => {
                  dispatch(createNewPost({ text: postInput, file: "" }));
                  handleUpload();
                  dispatch(getPosts());
                  setPostInput("");
                  setPostToggle(false);
                }}
                className="btn btn-fill py-1.5 px-3 rounded-2xl"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
