import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";

const Welcome = lazy(() => import("./pages/Welcome"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Layout = lazy(() => import("./routes/Layout"));
const Feed = lazy(() => import("./pages/Feed"));
const Following = lazy(() => import("./components/Feed/Following"));
const Trending = lazy(() => import("./components/Feed/Trending"));
const Projects = lazy(() => import("./pages/Projects"));
const Notifications = lazy(() => import("./pages/Notifications"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
            {/* Feed */}
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />}>
              <Route path="following" element={<Following />} />
              <Route path="trending" element={<Trending />} />
            </Route>
            {/* Projects */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
          {/* </Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
