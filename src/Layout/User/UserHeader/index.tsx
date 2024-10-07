import { Link, useLocation } from "react-router-dom";
import { memo } from "react";

const UserHeader: React.FC = () => {
  const location = useLocation();
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* <img src={travelLogo} alt="Jobby Logo" className="h-10 mr-4" /> */}
          <h1 className="text-2xl font-bold">Jobby</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-gray-600">
          <Link to="/" className="text-green-600 font-semibold">
            Trang chủ
          </Link>
          <Link to="/tim-cong-viec" className="hover:text-green-500">
            Tìm công việc
          </Link>
          <Link to="/phan-loai" className="hover:text-green-500">
            Phân loại
          </Link>
          <Link to="/nguoi-tuyen-dung" className="hover:text-green-500">
            Người tuyển dụng
          </Link>
          <Link to="/ve-chung-toi" className="hover:text-green-500">
            Về chúng tôi
          </Link>
        </nav>

        {/* Find Job Button */}
        {location.pathname === "/" ? (
          <Link
            to="/tim-cong-viec"
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            Tìm công việc <span aria-hidden="true">✈️</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};

export default memo(UserHeader);
