import React from "react";

const UserInfo: React.FC = () => {
  return (
    <div className="w-1/4 p-4 bg-gray-800 overflow-y-auto">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-500 rounded-full mb-2"></div>
        <h2 className="font-bold">Tuấn Hào</h2>
        <p className="text-sm text-green-500">Đang hoạt động</p>
      </div>
      <div className="mt-4 space-y-2">
        <button className="w-full p-2 bg-gray-700 rounded flex justify-center items-center text-gray-300">
          Trang cá nhân
        </button>
        <button className="w-full p-2 bg-gray-700 rounded flex justify-center items-center text-gray-300">
          Tắt thông báo
        </button>
        <button className="w-full p-2 bg-gray-700 rounded flex justify-center items-center text-gray-300">
          Tìm kiếm
        </button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Thông tin về đoạn chat</h3>
        <p className="text-sm text-gray-400 mt-1">Các tùy chọn khác...</p>
      </div>
    </div>
  );
};

export default UserInfo;
