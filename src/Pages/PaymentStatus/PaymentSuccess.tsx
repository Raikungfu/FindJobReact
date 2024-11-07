import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = decodeURIComponent(urlParams.get("message") || "");
    if (errorMessage) {
      setMessage(errorMessage);
    }

    if (window.opener) {
      window.opener.postMessage({ status: "success" }, "*");
    }

    window.close();
  }, []);

  return (
    <div>
      <h2>{message || "Thanh toán thành công!"}</h2>
    </div>
  );
};

export default PaymentSuccess;
