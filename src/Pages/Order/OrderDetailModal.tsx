import React, { useState } from "react";
import { Order } from "../../Types/order";
import { API_GET_PAYMENT_VNPAY } from "../../Service/JobServiceApi";
import { useError } from "../../Context/ErrorProvider";

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
        window.open(response.paymentUrl, "_blank");
      } else {
        setError("Failed to generate payment link. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Error processing payment. " + error + ". Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <button
          className="text-gray-500 hover:text-gray-700 float-right text-lg"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4">Order Details</h3>
        <p>Order ID: {order.OrderId}</p>
        <p>Description: {order.Description}</p>
        <p>Price: {order.Price} USD</p>
        <p>Order Date: {new Date(order.OrderDate!).toLocaleDateString()}</p>
        <p>Status: {order.OrderStatus}</p>
        <p>Payment Method: {order.PaymentMethod}</p>
        <p>Payment Status: {order.PaymentStatus}</p>
        {order.OrderStatus === "Pending" && (
          <>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Choose Payment Method
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
                  Domestic Card
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
                  International Card
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
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetailModal;
