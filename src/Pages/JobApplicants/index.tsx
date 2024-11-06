import React, { useEffect, useState } from "react";
import {
  API_GET_JOB_APPLY_DETAIL_BY_JOB,
  API_POST_HIRE_EMPLOYEE,
} from "../../Service/JobAPI";
import { JobApplyDetail } from "../../Types/job"; // Định nghĩa interface của JobApplyDetail
import EmployeeModal from "../../Components/Modal/EmployeeModal";
import { API_GET_EMPLOYEE_INFO } from "../../Service/UserAPI";

interface JobApplicantsProps {
  jobId: number;
}
export interface EmployeeProfileResponse {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Phone: string;
  Address: string;
  City: string;
  Region: string;
  Country: string;
  PostalCode: string;
  Description: string;
  Avt?: string;
  Cover?: string;
  UserId: number;
}
const JobApplicants: React.FC<JobApplicantsProps> = ({ jobId }) => {
  const [applicants, setApplicants] = useState<JobApplyDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setSelectedEmployeeId] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeProfileResponse | null>(null);

  const handleOpenModal = async (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    try {
      const employeeData: EmployeeProfileResponse = await API_GET_EMPLOYEE_INFO(
        employeeId
      );
      setSelectedEmployee(employeeData);
    } catch (error) {
      console.error("Error fetching employee details:", error);
      alert("Không thể lấy thông tin ứng viên. Vui lòng thử lại.");
    }
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setSelectedEmployeeId(null);
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await API_GET_JOB_APPLY_DETAIL_BY_JOB(jobId);
        setApplicants(response as JobApplyDetail[]);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setError("Không thể lấy danh sách ứng viên. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleHire = async (JobApplyId: number) => {
    try {
      await API_POST_HIRE_EMPLOYEE({
        JobApplyId: JobApplyId,
      });
      alert("Đã thuê ứng viên thành công!");
    } catch (error) {
      console.error("Error hiring employee:", error);
      alert("Không thể thuê ứng viên. Vui lòng thử lại.");
    }
  };

  if (loading) return <div className="text-center">Đang tải...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="pt-10 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Danh sách ứng viên
      </h1>
      {applicants.length === 0 ? (
        <p className="text-lg text-gray-600">
          Chưa có ứng viên nào apply vào công việc này.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl p-4">
          {applicants.map((applicant) => (
            <div
              key={applicant.JobApplyId}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {applicant.FirstName} {applicant.LastName}
              </h2>
              <p className="text-gray-600 mb-4">
                Điện thoại: {applicant.Phone}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                  onClick={() => handleHire(applicant.JobApplyId)}
                >
                  Nhận
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => handleOpenModal(applicant.EmployeeId)}
                >
                  Xem Hồ Sơ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedEmployee && (
        <EmployeeModal employee={selectedEmployee} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default JobApplicants;
