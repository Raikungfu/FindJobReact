import { FC } from "react";
// import UserHeader from "./userHeader";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";

const UserLayout: FC = () => {
  return (
    <div>
      <UserHeader />
      {<Outlet />}
      <footer>
        <p>User Footer</p>
      </footer>
    </div>
  );
};

export default UserLayout;
