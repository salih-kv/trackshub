import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

const Welcome = lazy(() => import("./pages/Welcome"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Layout = lazy(() => import("./components/Layout"));
const Feed = lazy(() => import("./pages/Feed"));
const Following = lazy(() => import("./components/Feed/Following"));
const Trending = lazy(() => import("./components/Feed/Trending"));
const Projects = lazy(() => import("./pages/Projects"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./components/Settings/Profile"));
const Account = lazy(() => import("./components/Settings/Account"));
const Notifications = lazy(() => import("./components/Settings/Notifications"));
const NotAvailable = lazy(() => import("./components/Error/NotAvailable"));
const NotFound = lazy(() => import("./components/Error/NotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/" element={<Layout />}>
            <Route path="feed" element={<Feed />}>
              <Route path="following" element={<Following />} />
              <Route path="trending" element={<NotAvailable />} />
            </Route>
            <Route path="/explore" element={<NotAvailable />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/library" element={<NotAvailable />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="profile" element={<Profile />} />
              <Route path="account" element={<Account />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>
          {/* </Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
