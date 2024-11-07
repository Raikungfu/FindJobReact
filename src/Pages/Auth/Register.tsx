import React from "react";
import GoogleIcon from "../../assets/google-icon.png";
import { API_REGISTER } from "../../Service/AuthAPI";
import { useNavigate } from "react-router-dom";
import { useError } from "../../Context/ErrorProvider";
import { useSuccess } from "../../Context/SuccessProvider";

export interface Register_Response {
  Message?: string;
  Status?: number;
  Token?: string;
  User?: {
    Email?: string;
    FullName?: string;
    Role?: string;
  };
}

const Register: React.FC = () => {
  const nav = useNavigate();
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const RegisterHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
    try {
      const formData = new FormData(e.currentTarget);
      const response = (await API_REGISTER(
        formData
      )) as unknown as Register_Response;
      if (response) {
        setSuccess("Chào mừng bạn đã trở thành một thành viên của Jobby nhé");
        nav("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
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

        <form onSubmit={RegisterHandler}>
          <div className="flex flex-row gap-2">
            <div className="mb-4">
              <label
                htmlFor="LastName"
                className="block text-gray-700 font-medium mb-2"
              >
                Họ*
              </label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập họ của bạn"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="FirstName"
                className="block text-gray-700 font-medium mb-2"
              >
                Tên*
              </label>
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập tên của bạn"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-gray-700 font-medium mb-2"
            >
              Tên đăng nhập*
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập tên đăng nhập của bạn"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-gray-700 font-medium mb-2"
            >
              Địa chỉ Email*
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập địa chỉ email của bạn"
            />
            <small className="text-gray-500">
              Thông báo việc làm sẽ được gửi đến email này
            </small>
          </div>

          <div className="mb-4">
            <label
              htmlFor="Password"
              className="block text-gray-700 font-medium mb-2"
            >
              Mật khẩu*
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="(Tối thiểu 6 ký tự)"
              minLength={6}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-medium mb-2"
            >
              Số điện thoại*
            </label>
            <input
              type="tel"
              id="Phone"
              name="Phone"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập số điện thoại của bạn"
            />
            <small className="text-gray-500">
              Người tuyển dụng sẽ liên lạc với bạn qua số này
            </small>
          </div>
          <div className="mb-7">
            <label className="block text-gray-700 font-medium mb-4">
              Giới tính:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  name="UserGender"
                  type="radio"
                  value="Male"
                  className="mr-2"
                />
                Nam
              </label>
              <label className="flex items-center">
                <input
                  name="UserGender"
                  type="radio"
                  value="Female"
                  className="mr-2"
                />
                Nữ
              </label>
              <label className="flex items-center">
                <input
                  name="UserGender"
                  type="radio"
                  value="Other"
                  className="mr-2"
                />
                Khác
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="birthDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Ngày sinh
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-7">
            <label className="block text-gray-700 font-medium mb-4">
              Bạn muốn đăng ký với vai trò:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  name="UserType"
                  type="radio"
                  value="Employee"
                  className="mr-2"
                />
                Người tìm việc
              </label>
              <label className="flex items-center">
                <input
                  name="UserType"
                  type="radio"
                  value="Employer"
                  className="mr-2"
                />
                Người tuyển dụng
              </label>
            </div>
          </div>
          {/* <div className="mb-4">
            <input type="checkbox" id="promotions" className="mr-2" />
            <label htmlFor="promotions" className="text-gray-700">
              Gửi cho tôi những thông tin cập nhật và khuyến mãi quan trọng qua
              SMS và mail
            </label>
          </div> */}

          <button
            className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition duration-300"
            type="submit"
          >
            Đăng ký ngay
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm">
          Khi nhấp vào Đăng ký, bạn đồng ý với{" "}
          <a href="#" className="text-green-500 hover:underline">
            Điều khoản và Điều kiện
          </a>{" "}
          &{" "}
          <a href="#" className="text-green-500 hover:underline">
            Chính sách Bảo mật
          </a>{" "}
          của Jobby
        </p>

        <div className="text-center my-4">hoặc đăng nhập với</div>

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
