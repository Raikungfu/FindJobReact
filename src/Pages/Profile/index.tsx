import React, { useEffect, useState } from "react";
import {
  API_UPDATE_EMPLOYEE,
  API_GET_USER_PROFILE,
  API_GET_EMPLOYEE_INFO,
} from "../../Service/UserAPI";
import { useParams } from "react-router-dom";

const Profile: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [profile, setProfile] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (id) {
          const employeeData = await API_GET_EMPLOYEE_INFO(Number(id));
          setProfile(employeeData);
          setEmployeeData(employeeData);
        } else {
          const profileData = await API_GET_USER_PROFILE();
          setProfile(profileData);
          setEmployeeData(profileData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy hồ sơ:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setEmployeeData((prevState: any) => ({
      ...prevState,
      [name]: files ? files[0] : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in employeeData) {
        if (employeeData[key] !== profile[key] && employeeData[key] !== null) {
          formData.append(key, employeeData[key]);
        }
      }
      await API_UPDATE_EMPLOYEE(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Hồ sơ cá nhân</h1>
        {!isEditing ? (
          <div>
            <p>
              <strong>Họ và tên:</strong> {profile.FirstName} {profile.LastName}
            </p>
            <p>
              <strong>Điện thoại:</strong> {profile.Phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {profile.Address}, {profile.City},{" "}
              {profile.Region}, {profile.Country}, {profile.PostalCode}
            </p>
            <p>
              <strong>Kỹ năng:</strong> {profile.Skills}
            </p>
            <p>
              <strong>Trình độ học vấn:</strong> {profile.Education}
            </p>
            <p>
              <strong>Kinh nghiệm:</strong> {profile.Experience}
            </p>
            <p>
              <strong>Ngôn ngữ:</strong> {profile.Language}
            </p>
            <p>
              <strong>Sở thích:</strong> {profile.Interest}
            </p>
            <p>
              <strong>Mạng xã hội:</strong> {profile.SocialMedia}
            </p>
            <p>
              <strong>Trạng thái:</strong> {profile.Status}
            </p>
            {profile.Image && (
              <img
                src={URL.createObjectURL(profile.Image)}
                alt="Profile"
                className="w-24 h-24 mt-4"
              />
            )}
            {!id && (
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Text Inputs */}
              <input
                type="text"
                name="FirstName"
                value={employeeData.FirstName || ""}
                onChange={handleInputChange}
                placeholder="Họ"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="LastName"
                value={employeeData.LastName || ""}
                onChange={handleInputChange}
                placeholder="Tên"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="Phone"
                value={employeeData.Phone || ""}
                onChange={handleInputChange}
                placeholder="Điện thoại"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="Skills"
                value={employeeData.Skills || ""}
                onChange={handleInputChange}
                placeholder="Kỹ năng"
                className="border p-2 rounded"
              />
              <textarea
                name="Description"
                value={employeeData.Description || ""}
                onChange={handleInputChange}
                placeholder="Mô tả"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="Education"
                value={employeeData.Education || ""}
                onChange={handleInputChange}
                placeholder="Trình độ học vấn"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="Experience"
                value={employeeData.Experience || ""}
                onChange={handleInputChange}
                placeholder="Kinh nghiệm"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="Language"
                value={employeeData.Language || ""}
                onChange={handleInputChange}
                placeholder="Ngôn ngữ"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="Interest"
                value={employeeData.Interest || ""}
                onChange={handleInputChange}
                placeholder="Sở thích"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="SocialMedia"
                value={employeeData.SocialMedia || ""}
                onChange={handleInputChange}
                placeholder="Mạng xã hội"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="Status"
                value={employeeData.Status || ""}
                onChange={handleInputChange}
                placeholder="Trạng thái"
                className="border p-2 rounded"
              />

              {/* File Inputs */}
              <input
                type="file"
                name="Image"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
              <input
                type="file"
                name="Resume"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
              <input
                type="file"
                name="CIFront"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
              <input
                type="file"
                name="CIBehind"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className={`bg-green-500 text-white px-4 py-2 mt-4 rounded ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
