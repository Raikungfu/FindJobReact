import React, { useState } from "react";
import { Order } from "../../Types/order";
import { API_GET_PAYMENT_VNPAY } from "../../Service/JobServiceApi";
import { useError } from "../../Context/ErrorProvider";
import { useSuccess } from "../../Context/SuccessProvider";

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

interface PaymentResponse {
  paymentUrl: string;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("DomesticCard");
  const { setError } = useError();
  const { setSuccess } = useSuccess();
  if (!order) return null;

  const handlePaymentClick = async (orderId: number) => {
    try {
      const formData = new FormData();
      formData.append("OrderId", orderId.toString());
      formData.append("PaymentMethod", paymentMethod);

      const response = (await API_GET_PAYMENT_VNPAY(
        formData
      )) as unknown as PaymentResponse;

      if (response.paymentUrl) {
        openVnPayPopup(response.paymentUrl);
      } else {
        setError("Failed to generate payment link. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Error processing payment. " + error + ". Please try again.");
    }
  };

  function openVnPayPopup(paymentUrl: string) {
    var width = 600;
    var height = 700;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;

    var paymentWindow = window.open(
      paymentUrl,
      "VnPayPayment",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (
      !paymentWindow ||
      paymentWindow.closed ||
      typeof paymentWindow.closed == "undefined"
    ) {
      alert("Vui lòng cho phép popup để thanh toán.");
    }

    window.addEventListener("message", function (event) {
      if (event.data.status === "success") {
        paymentWindow?.close();
        onClose();
        setSuccess("Thanh toán thành công!");
      } else if (event.data.status === "cancel") {
        paymentWindow?.close();
        setError("Thanh toán bị hủy! " + event.data.message);
      }
    });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <button
          className="text-gray-500 hover:text-gray-700 float-right text-lg"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h3>
        <p>ID: {order.OrderId}</p>
        <p>Mô tả chi tiết: {order.Description}</p>
        <p>
          Giá:{" "}
          {(order.Price ?? 0).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            useGrouping: true,
          })}
          đ
        </p>
        <p>Ngày đặt hàng: {new Date(order.OrderDate!).toLocaleDateString()}</p>
        <p>Trạng thái: {order.OrderStatus}</p>
        <p>Phương thức thanh toán: {order.PaymentMethod}</p>
        <p>Trạng thái thanh toán: {order.PaymentStatus}</p>
        {order.OrderStatus === "Pending" && (
          <>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Chọn phương thức thanh toán
              </h3>
              <div className="flex flex-col">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="VNPay"
                    className="mr-4"
                    checked={paymentMethod === "VNPay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  VNPay
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="DomesticCard"
                    className="mr-4"
                    checked={paymentMethod === "DomesticCard"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Thẻ nội địa
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="InternationalCard"
                    className="mr-4"
                    checked={paymentMethod === "InternationalCard"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Thẻ quốc tế/VISA
                </label>
              </div>
            </div>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                handlePaymentClick(order.OrderId);
              }}
            >
              Thanh Toán
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetailModal;
