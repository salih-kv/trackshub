import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "./Redux/slices/userSlice";
import { fetchProjectsByUserId } from "./Redux/slices/projectSlice";
import { fetchPosts } from "./Redux/slices/postSlice";
import { selectAuth } from "./Redux/slices/authSlice";
import Loading from "./components/Loading";
import PostPage from "./pages/PostPage";
import { Protected } from "./components/Project/Protected";

const Welcome = lazy(() => import("./pages/Welcome"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

const Layout = lazy(() => import("./components/Layout"));
const Feed = lazy(() => import("./pages/Feed"));
const Following = lazy(() => import("./components/Feed/Following"));
const Trending = lazy(() => import("./components/Feed/Trending"));

const UserPage = lazy(() => import("./pages/UserPage"));
const Posts = lazy(() => import("./components/User/Posts"));

const Projects = lazy(() => import("./pages/Projects"));
const MyProjects = lazy(() => import("./components/Projects/MyProjects"));
const CollabProjects = lazy(() =>
  import("./components/Projects/CollabProjects")
);

const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ProjectFiles = lazy(() => import("./components/Project/ProjectFiles"));
const ProjectCollaborators = lazy(() =>
  import("./components/Project/ProjectCollaborators")
);
const ProjectMessages = lazy(() =>
  import("./components/Project/ProjectMessages")
);
const ProjectTasks = lazy(() => import("./components/Project/ProjectTasks"));
const ProjectSettings = lazy(() =>
  import("./components/Project/ProjectSettings")
);
const ProjectComments = lazy(() =>
  import("./components/Project/ProjectComments")
);

const Tasks = lazy(() => import("./pages/Tasks"));

const Library = lazy(() => import("./pages/Library"));
const Albums = lazy(() => import("./components/Library/Albums"));
const Playlists = lazy(() => import("./components/Library/Playlists"));

const Chats = lazy(() => import("./pages/Chats"));

const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./components/Settings/Profile"));
const Account = lazy(() => import("./components/Settings/Account"));
const Plans = lazy(() => import("./components/Settings/Plans"));
const Notifications = lazy(() => import("./components/Settings/Notifications"));
const NotAvailable = lazy(() => import("./components/Error/NotAvailable"));
const NotFound = lazy(() => import("./components/Error/NotFound"));

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUser());
      dispatch(fetchPosts());
      dispatch(fetchProjectsByUserId());
    }
  }, [dispatch, isLoggedIn]);

  const { userProfile } = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* dynamic user🤖 route */}
          <Route
            path="/:username"
            element={<UserPage userProfile={userProfile} />}
          >
            <Route path="posts" element={<Posts />} />
            <Route path="tracks" element={<NotAvailable />} />
            <Route path="albums" element={<NotAvailable />} />
            <Route path="playlists" element={<NotAvailable />} />
          </Route>
          {/* dynamic post route */}
          <Route path="/:username/post/:postId" element={<PostPage />} />
          {/* protected🔒 route  */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              {/* Feed */}
              <Route path="feed" element={<Feed />}>
                <Route path="following" element={<Following />} />
                <Route path="trending" element={<Trending />} />
              </Route>
              {/* Projects */}
              <Route path="/projects" element={<Projects />}>
                <Route path="collab" element={<CollabProjects />} />
                <Route path="my-projects" element={<MyProjects />} />
                <Route path="deleted" element={<NotAvailable />} />
              </Route>
              {/* dynamic project route */}
              <Route path="/project/:projectId" element={<ProjectPage />}>
                <Route path="files" element={<ProjectFiles />} />
                <Route
                  path="collaborators"
                  element={<ProjectCollaborators />}
                />
                <Route path="messages" element={<ProjectMessages />} />
                <Route path="tasks" element={<ProjectTasks />} />
                <Route element={<Protected />}>
                  <Route path="settings" element={<ProjectSettings />} />
                </Route>
                <Route path="comments" element={<ProjectComments />} />
              </Route>
              {/* Tasks */}
              <Route path="/tasks" element={<Tasks />} />
              {/* Library */}
              <Route path="/library" element={<Library />}>
                <Route path="albums" element={<Albums />}></Route>
                <Route path="playlists" element={<Playlists />}></Route>
              </Route>
              {/* Chats */}
              <Route path="/chats" element={<Chats />} />
              {/* Settings⚙️ */}
              <Route path="/settings" element={<Settings />}>
                <Route path="profile" element={<Profile />} />
                <Route path="account" element={<Account />} />
                <Route path="billing" element={<Plans />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
