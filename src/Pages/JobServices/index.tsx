import React, { useEffect, useState } from "react";
import Modal from "../../Components/Modal";
import { JobService } from "../../Types/jobService";
import {
  API_GET_JOBS_SERVICE,
  API_POST_ORDER,
} from "../../Service/JobServiceApi";
import JobServiceList from "../../Components/JobService";
import { Order, PaymentResponse } from "../../Types/order";
import { useError } from "../../Context/ErrorProvider";
import { useSuccess } from "../../Context/SuccessProvider";
import {
  API_GET_PAYMENT_PAYOS,
  API_GET_PAYMENT_VNPAY,
} from "../../Service/PaymentAPI";

const JobServices: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobService | null>(null);
  const { setError } = useError();
  const { setSuccess } = useSuccess();
  const [jobServices, setJobServices] = useState<JobService[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("DomesticCard");

  let paymentWindow: Window | null = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchJobs =
          (await API_GET_JOBS_SERVICE()) as unknown as JobService[];

        if (fetchJobs) {
          setJobServices(fetchJobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOrder = async () => {
    const order = (await API_POST_ORDER({
      JobServiceId: selectedJob?.JobServiceId,
    })) as unknown as Order;
    if (order) {
      const orderData = {
        OrderId: order.OrderId.toString(),
        PaymentMethod: paymentMethod,
      };

      try {
        const formData = new FormData();
        Object.entries(orderData).forEach(([key, value]) =>
          formData.append(key, value)
        );

        var response: PaymentResponse;
        if (paymentMethod === "PayOS") {
          response = (await API_GET_PAYMENT_PAYOS(
            formData
          )) as unknown as PaymentResponse;

          if (response.paymentUrl) {
            openCheckoutPopup(response.paymentUrl, "Thanh toán PayOS");
          } else {
            setError("Failed to generate payment link. Please try again.");
          }
        } else {
          response = (await API_GET_PAYMENT_VNPAY(
            formData
          )) as unknown as PaymentResponse;

          if (response.paymentUrl) {
            openCheckoutPopup(response.paymentUrl, "Thanh toán VNPay");
          } else {
            setError("Failed to generate payment link. Please try again.");
          }
        }
      } catch (error) {
        console.error("Payment error:", error);
        setError("Error processing payment. " + error + ". Please try again.");
      }
    } else {
      setError("Please select a payment method.");
    }
  };

  const openModal = (jobId: number) => {
    const job = jobServices.find((service) => service.JobServiceId === jobId);
    setSelectedJob(job || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  function openCheckoutPopup(paymentUrl: string, paymentType: string) {
    checkout(paymentUrl, paymentType);

    window.addEventListener("message", function (event) {
      if (event.data.status === "success") {
        paymentWindow?.close();
        setIsModalOpen(false);
        setSelectedJob(null);
        setSuccess("Thanh toán thành công!");
      } else if (event.data.status === "cancel") {
        paymentWindow?.close();
        setError("Thanh toán bị hủy! " + event.data.message);
      }
    });
  }

  const checkout = (paymentUrl: string, paymentType: string) => {
    var width = 600;
    var height = 700;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;

    var paymentWindow = window.open(
      paymentUrl,
      paymentType,
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (paymentWindow) {
      paymentWindow.focus();
    } else {
      setError("Please allow popups for this website.");
    }
  };

  return (
    <div className="mt-5 pt-20 min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-green-600">Dịch vụ</h1>
      {jobServices.length === 0 ? (
        <p className="text-lg text-gray-600">No job services posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl p-4 mx-auto">
          <JobServiceList jobServices={jobServices} onOpenModal={openModal} />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedJob && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {selectedJob.ServiceName}
            </h2>
            <p className="text-gray-600">{selectedJob.Description}</p>
            <p className="text-gray-600">Loại: {selectedJob.jobServiceType}</p>
            <p className="text-green-600 font-semibold">
              Giá: {selectedJob.Price}đ
            </p>
            {selectedJob.Duration && (
              <p className="text-gray-500">
                Thời hạn: {selectedJob.Duration} ngày
              </p>
            )}

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Chọn Phương Thức Thanh Toán
              </h3>
              <div className="flex flex-col">
                {/* <label>
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
                </label> */}
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="PayOS"
                    className="mr-4"
                    checked={paymentMethod === "PayOS"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  QRCode
                </label>
              </div>
            </div>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300"
              onClick={handleOrder}
            >
              Đặt hàng
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobServices;
