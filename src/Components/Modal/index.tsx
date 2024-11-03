import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <button
          className="text-gray-500 hover:text-gray-700 float-right"
          onClick={onClose}
        >
          Close
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
