import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface ErrorContextProps {
  error: string | null;
  setError: (message: string | null) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (error) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      {error && (
        <div className="fixed bottom-0 w-1/4 bg-red-500 text-white pt-2 rounded shadow-lg z-50">
          <div className="px-4">
            {error}
            <div className="mt-2 text-xs text-white opacity-75">
              Tắt sau {countdown} giây...
            </div>
          </div>

          <div className="mt-2 bg-white h-2 relative w-full">
            <div
              className="absolute top-0 left-0 h-full bg-red-700"
              style={{
                width: `${(countdown / 5) * 100}%`,
                transition: "width 1s linear",
              }}
            />
          </div>
        </div>
      )}
    </ErrorContext.Provider>
  );
};
