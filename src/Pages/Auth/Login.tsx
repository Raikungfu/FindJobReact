import React from "react";
import GoogleIcon from "../../assets/google-icon.png";

const Login: React.FC = () => {
  return (
    <div className=" pt-20 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Đăng nhập tài khoản của bạn
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Chào mừng bạn đã quay trở lại với JOBBY!
        </p>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email ID / Tên người dùng
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập mật khẩu"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-green-500 cursor-pointer">
              Hiện
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">
                Ghi nhớ tôi
              </label>
            </div>
            <a href="#" className="text-green-500 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <button className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition duration-300">
            Đăng nhập
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">
          hoặc đăng ký tại đây
        </div>

        <button className="w-full py-3 flex items-center justify-center border rounded-lg text-gray-700 hover:bg-gray-100">
          <img src={GoogleIcon} alt="Google Icon" className="h-5 w-5 mr-2" />
          Đăng nhập bằng Google
        </button>

        <div className="text-center mt-6">
          Bạn chưa có tài khoản?{" "}
          <a href="/register" className="text-green-500 hover:underline">
            Đăng ký ngay!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
