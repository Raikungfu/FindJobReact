import React, { useEffect, useState } from "react";

interface ErrorNotificationProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded shadow-lg animate-fade">
      <p>{message}</p>
    </div>
  );
};

export default ErrorNotification;
