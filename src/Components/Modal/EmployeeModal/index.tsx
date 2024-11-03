import React from "react";

interface EmployeeModalProps {
  employee: {
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
    Avt?: string; // Nếu có đường dẫn đến ảnh đại diện
    Cover?: string; // Nếu có đường dẫn đến ảnh bìa
    UserId: number;
  };
  onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-2xl font-bold mb-4">
          Hồ sơ {employee.FirstName} {employee.LastName}
        </h2>
        {employee.Avt && (
          <img
            src={employee.Avt}
            alt={`Avatar of ${employee.FirstName} ${employee.LastName}`}
            className="mb-4 w-32 h-32 rounded-full"
          />
        )}
        <p>
          <strong>Điện thoại:</strong> {employee.Phone}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {employee.Address}
        </p>
        <p>
          <strong>Thành phố:</strong> {employee.City}
        </p>
        <p>
          <strong>Khu vực:</strong> {employee.Region}
        </p>
        <p>
          <strong>Quốc gia:</strong> {employee.Country}
        </p>
        <p>
          <strong>Mã bưu điện:</strong> {employee.PostalCode}
        </p>
        <p>
          <strong>Mô tả:</strong> {employee.Description}
        </p>
      </div>
    </div>
  );
};

export default EmployeeModal;
