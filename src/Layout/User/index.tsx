import { FC } from "react";
// import UserHeader from "./userHeader";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

const UserLayout: FC = () => {
  return (
    <div>
      <UserHeader />
      {<Outlet />}
      <UserFooter />
    </div>
  );
};

export default UserLayout;
