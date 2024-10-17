import React, { useEffect, useState } from "react";
import { API_GET_JOB_CATEGORIES, API_POST_JOB } from "../../Service/JobAPI"; // API để post job
import { useNavigate } from "react-router-dom";
import { JobCategory_Response } from "../../Types/job";
import useUser from "../../Hooks/useUser";

interface PostJobForm {
  title: string;
  description?: string;
  salary: number;
  dateFrom: string;
  dateTo: string;
  jobType: string;
  jobCategoryId: number;
  employerId: number;
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
  });
  console.log(formData);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobCategories, setJobCategories] = useState<JobCategory_Response[]>(
    []
  );
  const { user, loading, error: userError } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
        employerId: user.UserId,
      }));
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
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    if (!formData.employerId) {
      setError("Employer information is missing.");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await API_POST_JOB<PostJobForm>(formData);
      if (response) {
        alert("Job posted successfully!");
        navigate("/jobs");
      }
    } catch (error) {
      console.error(error);
      setError("Error posting the job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (userError || !user) return <div>Error loading user profile</div>;
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Đăng bài tuyển dụng
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Điền các thông tin chi tiết về công việc cần tuyển
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4">{error}</div>
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
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-gray-700 font-medium mb-2"
            >
              Mức lương*
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập mức lương"
              required
            />
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
                Select a category
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
      </div>
    </div>
  );
};

export default PostJob;
