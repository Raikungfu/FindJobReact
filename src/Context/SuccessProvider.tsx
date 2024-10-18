import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface SuccessContextProps {
  success: string | null;
  setSuccess: (message: string | null) => void;
}

const SuccessContext = createContext<SuccessContextProps | undefined>(
  undefined
);

export const useSuccess = () => {
  const context = useContext(SuccessContext);
  if (!context) {
    throw new Error("useSuccess must be used within a SuccessProvider");
  }
  return context;
};

export const SuccessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (success) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setSuccess(null);
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [success]);

  return (
    <SuccessContext.Provider value={{ success, setSuccess }}>
      {children}
      {success && (
        <div className="fixed bottom-0 w-1/4 bg-green-500 text-white pt-2 rounded shadow-lg z-50">
          <div className="px-4">
            {success}
            <div className="mt-2 text-xs text-white opacity-75">
              Tắt sau {countdown} giây...
            </div>
          </div>

          <div className="mt-2 bg-white h-2 relative w-full">
            <div
              className="absolute top-0 left-0 h-full bg-green-700"
              style={{
                width: `${(countdown / 5) * 100}%`,
                transition: "width 1s linear",
              }}
            />
          </div>
        </div>
      )}
    </SuccessContext.Provider>
  );
};
