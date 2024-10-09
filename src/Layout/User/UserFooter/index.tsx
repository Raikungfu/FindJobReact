import React from "react";
import PlaneIcon from "../../../assets/PaperPlane.png";
const UserFooter: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-bold mb-4">JOBBY</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Công việc
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Danh mục
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Blogs
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-bold mb-4">Hỗ trợ khách hàng</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Liên hệ với JOBBY
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Điều khoản
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Chính sách hỗ trợ
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Icon */}
        <div className="flex justify-center md:justify-end">
          <img src={PlaneIcon} alt="Paper Plane" className="h-20 w-20" />
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-6">
        <div className="flex justify-between items-center px-6">
          <p className="text-gray-400 text-sm">
            © Copyright 2024, All Rights Reserved by Jobby
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
