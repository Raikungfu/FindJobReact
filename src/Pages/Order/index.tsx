import React, { useEffect, useState } from "react";
import { Order } from "../../Types/order";
import { API_GET_ORDERS } from "../../Service/OrderAPI";
import OrderDetailModal from "./OrderDetailModal";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = (await API_GET_ORDERS()) as unknown as Order[];
        if (response) {
          setOrders(response);
        }
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="pt-20 min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Lịch Sử Đơn Hàng</h2>
        {orders.length === 0 ? (
          <p>Không tìm thấy đơn hàng nào</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.OrderId}
                className="border p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <h3 className="font-semibold">ID: {order.OrderId}</h3>
                <p>
                  Giá:
                  {(order.Price ?? 0).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    useGrouping: true,
                  })}
                  đ
                </p>
                <p>
                  Ngày đặt hàng:{" "}
                  {new Date(order.OrderDate!).toLocaleDateString()}
                </p>
                <p>Trạng thái: {order.OrderStatus}</p>
              </li>
            ))}
          </ul>
        )}
        {isModalOpen && selectedOrder && (
          <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
