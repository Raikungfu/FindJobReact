import { Route, Routes } from "react-router-dom";
import Page404 from "./Pages/Error";
import Home from "./Pages/Home";
import JobList from "./Pages/JobList";
import UserLayout from "./Layout/User";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import PostJob from "./Pages/PostJob";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="find-job" element={<JobList />} />
        <Route path="login" element={<Login />} />
        <Route path="dang-tim-viec" element={<PostJob />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default App;
