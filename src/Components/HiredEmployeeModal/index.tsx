// HiredEmployeesModal.tsx
import React from "react";
import { EmployeeProfileResponse } from "../../Pages/JobApplicants";
import { HiredEmployee } from "../../Types/user";

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
        {employees.length === 0 ? (
          <p>Không có nhân viên nào được thuê cho công việc này.</p>
        ) : (
          <ul>
            {employees.map((employee) => (
              <li key={employee.HireId}>
                Employee ID: {employee.EmployeeId}, Status: {employee.Status},
                Hire Date: {new Date(employee.HireDate).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HiredEmployeesModal;
