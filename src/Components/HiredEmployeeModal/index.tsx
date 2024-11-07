import React, { useState, useEffect } from "react";
import { HiredEmployee } from "../../Types/user";
import { API_GET_EMPLOYEE_INFO } from "../../Service/UserAPI";
import { useNavigate } from "react-router-dom";

interface HiredEmployeesModalProps {
  isOpen: boolean;
  employees: HiredEmployee[];
  onClose: () => void;
}

const HiredEmployeesModal: React.FC<HiredEmployeesModalProps> = ({
  employees,
  onClose,
  isOpen,
}) => {
  const [employeeDetails, setEmployeeDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const goToProfile = (employeeId: number) => {
    navigate(`/employee/${employeeId}`);
  };
  useEffect(() => {
    if (employees.length > 0) {
      const fetchEmployeeDetails = async () => {
        setLoading(true);
        try {
          const details = await Promise.all(
            employees.map(
              (employee) => API_GET_EMPLOYEE_INFO(employee.EmployeeId) // Gọi API để lấy thông tin nhân viên
            )
          );
          setEmployeeDetails(details); // Cập nhật chi tiết nhân viên
        } catch (err) {
          setError("Không thể tải thông tin nhân viên.");
        } finally {
          setLoading(false);
        }
      };

      fetchEmployeeDetails();
    }
  }, [employees]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          Danh sách nhân viên đã thuê
        </h2>

        {loading && <p>Đang tải thông tin...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {employees.length === 0 ? (
          <p>Không có nhân viên nào được thuê cho công việc này.</p>
        ) : (
          <ul>
            {employeeDetails.length > 0 &&
              employeeDetails.map((employeeDetail, index) => (
                <li key={employees[index].HireId} className="mb-4">
                  <p>
                    <strong>Name:</strong> {employeeDetail.FirstName}{" "}
                    {employeeDetail.LastName}
                  </p>
                  <p>
                    <strong>Status:</strong> {employees[index].Status}
                  </p>
                  <p>
                    <strong>Hire Date:</strong>{" "}
                    {new Date(employees[index].HireDate).toLocaleString()}
                  </p>
                  <button
                    onClick={() => goToProfile(employeeDetail.EmployeeId)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mt-2"
                  >
                    Xem Hồ Sơ
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HiredEmployeesModal;
