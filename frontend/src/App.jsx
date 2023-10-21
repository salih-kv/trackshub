import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import Loading from "./components/Loading";

const Welcome = lazy(() => import("./pages/Welcome"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

const Layout = lazy(() => import("./components/Layout"));
const Feed = lazy(() => import("./pages/Feed"));
const Following = lazy(() => import("./components/Feed/Following"));
const Trending = lazy(() => import("./components/Feed/Trending"));

const UserPage = lazy(() => import("./pages/UserPage"));

const Projects = lazy(() => import("./pages/Projects"));
const MyProjects = lazy(() => import("./components/Projects/MyProjects"));
const ProjectsList = lazy(() => import("./components/Projects/ProjectsList"));

const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ProjectSettings = lazy(() =>
  import("./components/Project/ProjectSettings")
);

const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./components/Settings/Profile"));
const Account = lazy(() => import("./components/Settings/Account"));
const Plans = lazy(() => import("./components/Settings/Plans"));
const Notifications = lazy(() => import("./components/Settings/Notifications"));
const NotAvailable = lazy(() => import("./components/Error/NotAvailable"));
const NotFound = lazy(() => import("./components/Error/NotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* dynamic user route */}
          <Route path="/:username" element={<UserPage />}>
            <Route index element={<NotAvailable />} />
            <Route path="tracks" element={<NotAvailable />} />
            <Route path="playlists" element={<NotAvailable />} />
          </Route>
          {/* // */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              {/* Feed */}
              <Route path="feed" element={<Feed />}>
                <Route path="trending" element={<NotAvailable />} />
                <Route path="following" element={<Following />} />
              </Route>
              {/* Explore */}
              <Route path="/explore" element={<NotAvailable />} />
              {/* Projects */}
              <Route path="/projects" element={<Projects />}>
                <Route path="all" element={<NotAvailable />} />
                <Route path="my-projects" element={<MyProjects />} />
                <Route path="deleted" element={<NotAvailable />} />
              </Route>
              {/* dynamic project route */}
              <Route path="/project/:projectId" element={<ProjectPage />}>
                <Route path="files" element={<NotAvailable />} />
                <Route path="collaborators" element={<NotAvailable />} />
                <Route path="messages" element={<NotAvailable />} />
                <Route path="tasks" element={<NotAvailable />} />
                <Route path="settings" element={<ProjectSettings />} />
                <Route path="comments" element={<NotAvailable />} />
              </Route>
              {/* Library */}
              <Route path="/library" element={<NotAvailable />} />
              {/* Settings */}
              <Route path="/settings" element={<Settings />}>
                <Route path="profile" element={<Profile />} />
                <Route path="account" element={<Account />} />
                <Route path="billing" element={<NotAvailable />} />
                <Route path="notifications" element={<NotAvailable />} />
              </Route>
            </Route>
          </Route>
          {/* // */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
