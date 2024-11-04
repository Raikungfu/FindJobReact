import React from "react";
import { JobServiceListProps } from "../../Types/jobService";

const JobServiceList: React.FC<
  JobServiceListProps & { onOpenModal: (jobId: number) => void }
> = ({ jobServices, onOpenModal }) => {
  return (
    <>
      {jobServices.map((service) => (
        <div
          key={service.JobServiceId}
          className="w-full flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 shadow-md text-center transition-transform transform hover:scale-105"
        >
          <img
            src={service.Image || "default-image-url.jpg"}
            alt={service.ServiceName}
            className="w-full h-36 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold">{service.ServiceName}</h3>
          <p className="text-sm text-gray-600">
            Type: {service.jobServiceType}
          </p>
          <p className="text-blue-600 font-semibold">Price: ${service.Price}</p>
          {service.Duration && (
            <p className="text-gray-500 text-sm">
              Duration: {service.Duration} hours
            </p>
          )}
          <button
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600 transition duration-300"
            onClick={() => onOpenModal(service.JobServiceId)}
          >
            Xem chi tiết
          </button>
        </div>
      ))}
    </>
  );
};

export default JobServiceList;
