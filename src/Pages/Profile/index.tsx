import React, { useEffect, useState } from "react";
import {
  API_UPDATE_EMPLOYEE,
  API_GET_USER_PROFILE,
  API_GET_EMPLOYEE_INFO,
  API_GET_EMPLOYER_INFO,
  API_UPDATE_EMPLOYER,
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

  // const userType = JSON.parse(localStorage.getItem("User") || "{}").UserType;
  const [userType, setUserType] = useState<"Employee" | "Employer" | null>(
    null
  );
  const navigate = useNavigate();
  const loggedInUserId = JSON.parse(
    localStorage.getItem("User") || "{}"
  ).UserId;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfileData: EmployeeProfile | EmployerProfile =
          await API_GET_USER_PROFILE(id ? Number(id) : undefined);
        setProfile(userProfileData);

        // Dựa trên dữ liệu trả về, xác định userType
        if ("EmployeeId" in userProfileData) {
          setUserType("Employee");
        } else {
          setUserType("Employer");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [id, userType]);
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       if (userType === "Employee") {
  //         const employeeData: EmployeeProfile = id
  //           ? await API_GET_EMPLOYEE_INFO(Number(id))
  //           : await API_GET_USER_PROFILE();
  //         setProfile(employeeData);
  //         setEmployeeData(employeeData);
  //       } else if (userType === "Employer") {
  //         const employerData: EmployerProfile = id
  //           ? await API_GET_EMPLOYER_INFO(Number(id))
  //           : await API_GET_USER_PROFILE();
  //         setProfile(employerData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };
  //   fetchProfile();
  // }, [id, userType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (userType === "Employee") {
      setEmployeeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (userType === "Employer" && profile) {
      setProfile((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      // Prepare form data based on user type
      if (userType === "Employee") {
        // Append only non-null and defined employee fields to formData
        Object.entries(employeeData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, value as Blob);
          }
        });
        // Call the employee update API
        await API_UPDATE_EMPLOYEE(formData);
      } else if (userType === "Employer" && profile) {
        // Append only non-null and defined employer fields to formData
        Object.entries(profile).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, value as Blob);
          }
        });
        // Call the employer update API
        await API_UPDATE_EMPLOYER(formData);
      }

      // Re-fetch the updated profile to display updated information
      const updatedProfile: EmployeeProfile | EmployerProfile = id
        ? userType === "Employee"
          ? await API_GET_EMPLOYEE_INFO(Number(id))
          : await API_GET_EMPLOYER_INFO(Number(id))
        : await API_GET_USER_PROFILE();

      // Set profile and employee data with updated information
      setProfile(updatedProfile);
      if (userType === "Employee") {
        setEmployeeData(updatedProfile as EmployeeProfile);
      }
      setIsEditing(false); // Exit editing mode
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
        {isEditing ? (
          <textarea
            name="Skills"
            value={employeeData.Skills}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="text-gray-600">{profile.Skills}</p>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Education</h3>
        {isEditing ? (
          <textarea
            name="Education"
            value={employeeData.Education}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="text-gray-600">{profile.Education}</p>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
        {isEditing ? (
          <input
            type="text"
            name="Phone"
            value={employeeData.Phone}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="text-gray-600">{profile.Phone}</p>
        )}
      </div>
    </div>
  );

  const renderEmployerDetails = (profile: EmployerProfile) => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Company Name</h3>
        {isEditing ? (
          <input
            type="text"
            name="CompanyName"
            value={profile.CompanyName}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="text-gray-600">{profile.CompanyName}</p>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Description</h3>
        {isEditing ? (
          <textarea
            name="Description"
            value={profile.Description}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="text-gray-600">{profile.Description}</p>
        )}
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
              {!id || id == loggedInUserId ? (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
                >
                  {isEditing ? "Lưu thay đổi" : "Chỉnh sửa hồ sơ"}
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => navigate(`/chat/${id}`)}
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
