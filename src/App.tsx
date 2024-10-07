import { Route, Routes } from "react-router-dom";
import Page404 from "./Pages/Error";
import Home from "./Pages/Home";
import UserLayout from "./Layout/User";
import Login from "./Pages/Auth/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default App;
