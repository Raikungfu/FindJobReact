import React, { useState } from "react";
import GoogleIcon from "../../assets/google-icon.png";
const Register: React.FC = () => {
  const [role, setRole] = useState("jobSeeker");

  const handleRoleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRole(e.target.value);
  };
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Đơn đăng ký thành viên
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Chào mừng bạn đã quay trở lại với JOBBY!
        </p>

        <form>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-2"
            >
              Họ và tên*
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập tên đầy đủ của bạn"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Địa chỉ Email*
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email id"
            />
            <small className="text-gray-500">
              Job notifications will be sent to this email id
            </small>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="(Minimum 6 characters)"
            />
            <small className="text-green-500 cursor-pointer">
              Remember your password
            </small>
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-medium mb-2"
            >
              Mobile number*
            </label>
            <input
              type="tel"
              id="mobile"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your mobile number"
            />
            <small className="text-gray-500">
              Recruiters will contact you on this number
            </small>
          </div>
          <div className="mb-7">
            <label className="block text-gray-700 font-medium mb-4">
              Bạn muốn đăng ký với vai trò:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="jobSeeker"
                  checked={role === "jobSeeker"}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                Người tìm việc
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="employer"
                  checked={role === "employer"}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                Người tuyển dụng
              </label>
            </div>
          </div>
          <div className="mb-4">
            <input type="checkbox" id="promotions" className="mr-2" />
            <label htmlFor="promotions" className="text-gray-700">
              Send me important updates & promotions via SMS, email, and{" "}
              <span className="text-green-500">WhatsApp</span>
            </label>
          </div>

          <button className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition duration-300">
            Register now
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm">
          By clicking Register, you agree to the{" "}
          <a href="#" className="text-green-500 hover:underline">
            Terms and Conditions
          </a>{" "}
          &{" "}
          <a href="#" className="text-green-500 hover:underline">
            Privacy Policy
          </a>{" "}
          of AlwaysApply.com
        </p>

        <div className="text-center my-4">or signup with</div>

        <div className="flex justify-center space-x-4">
          <button className="border p-3 rounded-lg hover:bg-gray-100">
            <img src={GoogleIcon} alt="Google Icon" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
