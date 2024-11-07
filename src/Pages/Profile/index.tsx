import React, { useEffect, useState } from "react";
import {
  API_UPDATE_EMPLOYEE,
  API_GET_USER_PROFILE,
  API_GET_EMPLOYEE_INFO,
  API_GET_EMPLOYER_INFO,
} from "../../Service/UserAPI";
import { useNavigate, useParams } from "react-router-dom";
import {
  EmployeeProfile,
  EmployerProfile,
  defaultProfile,
} from "../../Types/user";

const Profile: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [profile, setProfile] = useState<
    EmployeeProfile | EmployerProfile | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] =
    useState<EmployeeProfile>(defaultProfile);
  const [loading, setLoading] = useState(false);

  const userType = JSON.parse(localStorage.getItem("User") || "{}").UserType;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userType === "Employee") {
          const employeeData: EmployeeProfile = id
            ? await API_GET_EMPLOYEE_INFO(Number(id))
            : await API_GET_USER_PROFILE();
          setProfile(employeeData as unknown as EmployeeProfile);
          setEmployeeData(employeeData as EmployeeProfile);
        } else if (userType === "Employer") {
          // Fetch Employer profile
          const employerData: EmployerProfile = id
            ? await API_GET_EMPLOYER_INFO(Number(id))
            : await API_GET_USER_PROFILE();
          setProfile(employerData as unknown as EmployerProfile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [id, userType]);
  console.log("Updated profile in state:", profile);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChat = () => {
    const targetUserId = profile?.UserId;
    if (targetUserId) {
      navigate(`/chat?userId=${targetUserId}`);
    }
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

      const updatedProfile = id
        ? await API_GET_EMPLOYEE_INFO(Number(id))
        : await API_GET_USER_PROFILE();

      setProfile(updatedProfile as EmployeeProfile);
      setEmployeeData(updatedProfile as EmployeeProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };
  const renderEmployeeDetails = (profile: EmployeeProfile) => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
        <p className="text-gray-600">{profile?.Skills}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Education</h3>
        <p className="text-gray-600">{profile?.Education}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
        <p className="text-gray-600">{profile?.Experience}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
        <p className="text-gray-600">{profile?.Phone}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Address</h3>
        <p className="text-gray-600">
          {profile?.Address}, {profile?.City}, {profile?.Country}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Description</h3>
        <p className="text-gray-600">{profile?.Description}</p>
      </div>
    </div>
  );

  const renderEmployerDetails = (profile: EmployerProfile) => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Company Name</h3>
        <p className="text-gray-600">{profile?.CompanyName}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Description</h3>
        <p className="text-gray-600">{profile?.Description}</p>
      </div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen flex flex-col items-center bg-gray-100">
      {profile && (
        <>
          <div className="relative w-full max-w-5xl">
            <img
              src={
                "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              alt="Cover"
              className="w-full h-60 object-cover rounded-t-lg"
            />
            <div className="absolute bottom-0 right-4 p-2 bg-white rounded-full shadow-md">
              <label
                htmlFor="coverImage"
                className="text-blue-500 cursor-pointer"
              >
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
                  {userType === "Employer"
                    ? (profile as EmployerProfile)?.CompanyName
                    : `${(profile as EmployeeProfile)?.FirstName} ${
                        (profile as EmployeeProfile)?.LastName
                      }`}
                </h1>
              </div>

              {!id && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh sửa hồ sơ
                </button>
              )}
              {id && (
                <button
                  onClick={handleChat}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Nhắn tin
                </button>
              )}
            </div>
          </div>

          <div className=" w-full max-w-5xl min-h-screen bg-gray-50 p-6">
            {userType === "Employee" &&
              renderEmployeeDetails(profile as EmployeeProfile)}
            {userType === "Employer" &&
              renderEmployerDetails(profile as EmployerProfile)}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
