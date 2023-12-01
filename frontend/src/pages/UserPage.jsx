import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsInstagram, BsSpotify, BsThreeDots } from "react-icons/bs";
import { IoChatbubblesSharp } from "react-icons/io5";
import { BiLinkAlt } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { PrivateHeader } from "../components/Navbar/PrivateHeader";
import {
  fetchUserByUsername,
  followUser,
  selectUser,
  setIsCurrentUser,
} from "../Redux/slices/userSlice";
import WelcomeHeader from "../components/Welcome/WelcomeHeader";
import ProfileImg from "../components/ProfileImg";
import PageNotFound from "../components/Error/PageNotFound";
import { fetchPostsByUsername } from "../Redux/slices/postSlice";

const UserPage = ({ userProfile }) => {
  const navigate = useNavigate();
  const { username } = useParams();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user, isCurrentUser, loading } = useSelector(selectUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const isCurrentUserProfile = user?._id === userProfile?._id;

  useEffect(() => {
    const path = window.location.pathname;
    if (path === `/${username}`) {
      navigate(`/${username}/posts`);
    }
  }, [navigate, username]);

  useEffect(() => {
    dispatch(fetchUserByUsername(username));
    dispatch(fetchPostsByUsername(username));
  }, [dispatch, username]);

  useEffect(() => {
    setIsFollowing(userProfile?.followers?.includes(user?._id));
  }, [userProfile, user._id]);

  useEffect(() => {
    dispatch(setIsCurrentUser(isCurrentUserProfile));
  }, [dispatch, isCurrentUserProfile]);

  const followersCount = userProfile?.followers?.length || 0;
  const followingCount = userProfile?.following?.length || 0;

  const handleFollowButtonClick = async () => {
    dispatch(followUser(userProfile?._id));
  };

  return (
    <div className="relative min-h-screen dark:bg-p-dark dark:text-white">
      {isLoggedIn ? <PrivateHeader /> : <WelcomeHeader isShow={true} />}
      <div className="w-full h-44 sm:h-60 lg:h-52 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-400">
        {!userProfile ||
          (Object.keys(userProfile).length === 0 && <PageNotFound />)}
      </div>
      {Object.keys(userProfile).length > 0 && (
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center mx-auto max-w-screen-2xl px-4">
          <div className="relative z-10">
            <div className="bg-primary-50 dark:bg-primary-300 w-36 h-36 rounded-full absolute top-100 left-1/2 transform translate-x-[-50%] translate-y-[-50%]">
              <ProfileImg
                w={`full`}
                profileURL={userProfile?.profilePic}
                name={userProfile?.name}
              />
            </div>
            <div>
              <div className="pt-20 pb-4 px-4 flex flex-col items-center">
                <div>
                  <h2 className="font-semibold text-2xl text-center">
                    {userProfile?.name}
                  </h2>
                  <h2 className="text-gray-600 text-sm flex items-center gap-2">
                    <div>{`@${userProfile?.username}`}</div>
                    <div className="font-extrabold w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div>{userProfile?.location}</div>
                  </h2>
                  <div className="flex gap-2 items-center justify-center mt-4">
                    <div className="w-6 h-6 rounded-full bg-s-light dark:bg-s-dark flex items-center justify-center">
                      <BiLinkAlt />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-s-light dark:bg-s-dark flex items-center justify-center">
                      <BsInstagram />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-s-light dark:bg-s-dark flex items-center justify-center">
                      <BsSpotify />
                    </div>
                  </div>
                </div>
                {isCurrentUser ? (
                  <div className="mt-5">
                    <Link
                      to="/settings/profile"
                      className="btn btn-secondary !text-primary-500 py-1.5 px-16 rounded-2xl"
                    >
                      <FiEdit3 />
                      <span className="ml-2">Edit</span>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-[120px,120px,50px] mt-5">
                    <Link className="btn w-28 h-10 rounded-2xl bg-primary-200  text-primary-500">
                      <IoChatbubblesSharp className="mr-1" />
                      Chat
                    </Link>
                    {loading ? (
                      <span>...</span>
                    ) : (
                      <button
                        onClick={handleFollowButtonClick}
                        className={`btn w-28 h-10 rounded-2xl ${
                          isFollowing ? "btn-outlined" : "btn-fill"
                        }`}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    )}
                    <button className="btn bg-s-light dark:bg-s-dark px-4 rounded-2xl">
                      <BsThreeDots />
                    </button>
                  </div>
                )}
                <div className="mt-4 flex gap-6">
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-lg">{followersCount}</p>
                    <p className="text-sm font-medium text-gray-600">
                      Followers
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-lg">{followingCount}</p>
                    <p className="text-sm font-medium text-gray-600">
                      Following
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Middle />
        </div>
      )}
    </div>
  );
};

export default UserPage;

const Middle = () => {
  const NavLinks = [
    {
      to: "posts",
      label: "Posts",
    },
    {
      to: "tracks",
      label: "Tracks",
    },
    {
      to: "albums",
      label: "Albums",
    },
    {
      to: "playlists",
      label: "Playlists",
    },
  ];
  return (
    <div className="w-full lg:w-2/4">
      <header className="flex gap-8 md:pt-12">
        {NavLinks?.map(({ to, label }) => (
          <div key={to} className="group/link hover:bg-slate-100">
            <NavLink to={to} className="font-medium">
              {label}
            </NavLink>
            <div className="w-8 h-[2px] bg-black invisible group-hover/link:visible"></div>
          </div>
        ))}
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
