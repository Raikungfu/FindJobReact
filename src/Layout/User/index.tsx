// UserLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
const UserLayout = () => {
  const location = useLocation();

  // Check if the current route is "/chat"
  const isChatPage = location.pathname === "/chat";

  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* Render Footer only if not on the chat page */}
      {!isChatPage && <UserFooter />}
    </div>
  );
};

export default UserLayout;
