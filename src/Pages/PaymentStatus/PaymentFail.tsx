import { useEffect, useState } from "react";

const PaymentFail = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = decodeURIComponent(urlParams.get("message") || "");
    if (errorMessage) {
      setMessage(errorMessage);
    }

    if (window.opener) {
      window.opener.postMessage(
        { status: "cancel", message: errorMessage },
        "*"
      );
    }

    window.close();
  }, []);

  return (
    <div>
      <h2>{message || "Thanh toán bị hủy!"}</h2>
    </div>
  );
};

export default PaymentFail;
