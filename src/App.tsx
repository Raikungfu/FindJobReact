import { Route, Routes } from "react-router-dom";
import Page404 from "./Pages/Error";
import Home from "./Pages/Home";
import JobList from "./Pages/JobList";
import UserLayout from "./Layout/User";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import PostJob from "./Pages/PostJob";
import JobDetail from "./Pages/JobDetail";
import Profile from "./Pages/Profile";
import ManageJobs from "./Pages/ManageJob";
import JobServices from "./Pages/JobServices";
import OrderHistory from "./Pages/Order";
import PaymentSuccess from "./Pages/PaymentStatus/PaymentSuccess";
import PaymentFail from "./Pages/PaymentStatus/PaymentFail";
import ChatPage from "./Pages/Chat";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="tim-cong-viec" element={<JobList />} />
        <Route path="login" element={<Login />} />
        <Route path="dang-tim-viec" element={<PostJob />} />
        <Route path="register" element={<Register />} />
        <Route path="job/:jobId" element={<JobDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-posts" element={<ManageJobs />} />
        <Route path="dich-vu" element={<JobServices />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="order-history" element={<OrderHistory />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="payment-fail" element={<PaymentFail />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default App;
