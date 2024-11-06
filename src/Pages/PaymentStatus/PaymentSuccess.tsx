import { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ status: "success" }, "*");
    }

    window.close();
  }, []);

  return (
    <div>
      <h2>Thanh toán thành công!</h2>
    </div>
  );
};

export default PaymentSuccess;
