import React, { useEffect, useState } from "react";
import {
  API_UPDATE_EMPLOYEE,
  API_GET_USER_PROFILE,
  API_GET_EMPLOYEE_INFO,
} from "../../Service/UserAPI";
import { useParams } from "react-router-dom";
import { EmployeeProfile, defaultProfile } from "../../Types/user";

const Profile: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] =
    useState<EmployeeProfile>(defaultProfile);
  const [loading, setLoading] = useState(false);
  const userType = JSON.parse(localStorage.getItem("User") || "{}").UserType;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userType === "Employee") {
          // Fetch employee profile based on URL ID or logged-in user
          const employeeData: EmployeeProfile = id
            ? await API_GET_EMPLOYEE_INFO(Number(id))
            : await API_GET_USER_PROFILE();
          setProfile(employeeData);
          setEmployeeData(employeeData);
        } else if (userType === "Employer") {
          // // Fetch employer profile if user is an employer
          // const employerData: EmployerProfile = id? await API_GET_EMPLOYER_INFO(Number(id)): await API_GET_USER_PROFILE();;
          // setProfile(employerData);
          // setEmployeeData(employerData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy hồ sơ:", error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  function isEmployeeProfileKey(key: string): key is keyof EmployeeProfile {
    return key in defaultProfile;
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: files ? files[0] : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in employeeData) {
        if (
          isEmployeeProfileKey(key) &&
          employeeData[key] !== null &&
          employeeData[key] !== undefined
        ) {
          formData.append(key, employeeData[key] as Blob);
        }
      }

      await API_UPDATE_EMPLOYEE(formData);

      const updatedProfile: EmployeeProfile = id
        ? await API_GET_EMPLOYEE_INFO(Number(id))
        : await API_GET_USER_PROFILE();

      setProfile(updatedProfile);
      setEmployeeData(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex flex-col items-center bg-gray-100">
      {/* Cover Photo Section */}
      <div className="relative w-full max-w-5xl">
        <img
          src={
            "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          alt="Cover"
          className="w-full h-60 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 right-4 p-2 bg-white rounded-full shadow-md">
          <label htmlFor="coverImage" className="text-blue-500 cursor-pointer">
            Chọn ảnh bìa
          </label>
          <input
            type="file"
            id="coverImage"
            name="CoverImage"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Avatar and Profile Info Section */}
      <div className="relative -mt-16 w-full max-w-5xl bg-white p-6 rounded-b-lg shadow-lg">
        <div className="relative flex items-center space-x-4">
          <div className="relative w-32 h-32">
            <img
              src={
                "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg"
              }
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md">
              <label
                htmlFor="avatarImage"
                className="text-blue-500 cursor-pointer text-sm"
              >
                Chọn ảnh đại diện
              </label>
              <input
                type="file"
                id="avatarImage"
                name="Image"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {profile?.FirstName} {profile?.LastName}
            </h1>
            <p className="text-gray-600">{profile?.Status}</p>
          </div>
          {!id && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa hồ sơ
            </button>
          )}
        </div>
      </div>

      {/* Profile Details and Edit Form */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg mt-4 shadow-lg">
        {!isEditing ? (
          <div>
            <p>
              <strong>Điện thoại:</strong> {profile?.Phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {profile?.Address}, {profile?.City},{" "}
              {profile?.Region}, {profile?.Country}, {profile?.PostalCode}
            </p>
            {/* Thêm các thông tin khác như Kỹ năng, Trình độ học vấn, Sở thích, v.v. */}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="FirstName"
              value={employeeData.FirstName}
              onChange={handleInputChange}
              placeholder="Họ"
              className="border p-2 rounded w-full mb-2"
            />
            {/* Thêm các trường khác cho người dùng nhập */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              disabled={loading}
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
