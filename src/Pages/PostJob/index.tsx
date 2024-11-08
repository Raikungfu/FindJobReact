import React, { useEffect, useState } from "react";
import { API_GET_JOB_CATEGORIES, API_POST_JOB } from "../../Service/JobAPI"; // API để post job
import { Link, useNavigate } from "react-router-dom";
import { JobCategory_Response } from "../../Types/job";
import useUser from "../../Hooks/useUser";
import { JobLocation } from "../../Types/constant";
import { AxiosError } from "axios";

interface PostJobForm {
  title: string;
  description?: string;
  salary: number;
  dateFrom: string;
  dateTo: string;
  jobType: string;
  jobCategoryId: number;
  employerId: number;
  location: string;
}

const PostJob: React.FC = () => {
  const [formData, setFormData] = useState<PostJobForm>({
    title: "",
    description: "",
    salary: 0,
    dateFrom: "",
    dateTo: "",
    jobType: "FullTime",
    jobCategoryId: 0,
    employerId: 0,
    location: "",
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobCategories, setJobCategories] = useState<JobCategory_Response[]>(
    []
  );
  const { user, loading, logout } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [showServiceRedirect, setShowServiceRedirect] = useState(false);

  const userData = localStorage.getItem("User");
  const parsedUser = userData ? JSON.parse(userData) : null;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await API_GET_JOB_CATEGORIES();
        setJobCategories(categories as unknown as JobCategory_Response[]);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    if (user && user.UserType === "Employer") {
      setFormData((prev) => ({
        ...prev,
      }));
    }
    if (user && user.UserType === "Employee") {
      setIsEmployee(user.UserType === "Employee");
    }
  }, [user]);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    setSelectedCategory(categoryId);
    setFormData((prev) => ({
      ...prev,
      jobCategoryId: categoryId,
    }));
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "salary" || name === "jobCategoryId"
          ? parseFloat(value)
          : value in JobLocation
          ? value
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!user || parsedUser.UserType !== "Employer") {
      if (isEmployee) {
        setError(
          "Bạn đang đăng nhập với tư cách là người tìm việc. Hãy đăng nhập lại với vai trò người tuyển dụng."
        );
      } else {
        setShowLoginPrompt(true);
      }
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await API_POST_JOB<PostJobForm>(formData);
      if (response) {
        setShowSuccessPopup(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        if (error.message == "403") {
          setShowServiceRedirect(true);
        }
      }
      throw new Error("Đã xảy ra lỗi không xác định.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleLoginRedirect = () => {
    navigate("/login");
  };
  const handleHomeRedirect = () => {
    setShowSuccessPopup(false);
    navigate("/");
  };
  const handleLogoutAndRedirect = () => {
    logout();
    navigate("/login");
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Đăng bài tuyển dụng
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Điền các thông tin chi tiết về công việc cần tuyển
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Modal hoặc thông báo với nút */}
        {showServiceRedirect && (
          <div className="modal">
            <p>Bạn không còn dịch vụ đăng tuyển nào. Hãy mua thêm dịch vụ.</p>
            <Link to="/dich-vu">Đi đến Dịch vụ</Link>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Tên công việc*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập tên công việc"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Mô tả công việc
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập mô tả công việc"
              rows={5}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-gray-700 font-medium mb-2"
            >
              Mức lương*
            </label>
            <div className="relative">
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-3 pr-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập mức lương"
                required
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                VND
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="dateFrom"
              className="block text-gray-700 font-medium mb-2"
            >
              Ngày bắt đầu*
            </label>
            <input
              type="date"
              id="dateFrom"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dateTo"
              className="block text-gray-700 font-medium mb-2"
            >
              Ngày kết thúc*
            </label>
            <input
              type="date"
              id="dateTo"
              name="dateTo"
              value={formData.dateTo}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2"
            >
              Địa điểm*
            </label>
            <select
              name="location"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-50"
              onChange={handleChange}
            >
              {Object.entries(JobLocation).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="jobType"
              className="block text-gray-700 font-medium mb-2"
            >
              Loại công việc*
            </label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="FullTime">Toàn thời gian</option>
              <option value="PartTime">Bán thời gian</option>
              <option value="Contract">Hợp đồng</option>
              <option value="Internship">Thực tập</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="jobCategoryId"
              className="block text-gray-700 font-medium mb-2"
            >
              ID danh mục công việc*
            </label>
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedCategory || ""}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {jobCategories.map((category) => (
                <option
                  key={category.JobCategoryId}
                  value={category.JobCategoryId}
                >
                  {category.JobCategoryName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-green-500 text-white rounded-lg font-medium ${
              isSubmitting ? "opacity-50" : "hover:bg-green-600"
            } transition duration-300`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng..." : "Đăng bài"}
          </button>
        </form>
        {/* Success popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-center mb-4">
                Đăng bài tuyển dụng thành công!
              </h2>
              <button
                onClick={handleHomeRedirect}
                className="bg-green-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-green-600"
              >
                Trở về trang chủ
              </button>
            </div>
          </div>
        )}
        {/* Modal or alert prompting user to log in */}
        {showLoginPrompt && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-center mb-4">
                Bạn phải đăng nhập để đăng bài tuyển dụng
              </h2>
              <button
                onClick={handleLoginRedirect}
                className="bg-green-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-green-600"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        )}
        {/* Message for employee */}
        {isEmployee && error && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-center mb-4">
                {error}
              </h2>
              <button
                onClick={handleLogoutAndRedirect}
                className="bg-green-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-green-600"
              >
                Đăng nhập lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostJob;
