import React, { useEffect, useState } from "react";
import { API_GET_JOB_EMPLOYER } from "../../Service/JobAPI";
import { JobList_Response } from "../../Types/job";
import JobApplicants from "../JobApplicants";
import Modal from "../../Components/Modal";

const ManageJobs: React.FC = () => {
  const [jobs, setJobs] = useState<JobList_Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const storedUser = localStorage.getItem("User");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser.UserType === "Employer") {
          const fetchedJobs =
            (await API_GET_JOB_EMPLOYER()) as JobList_Response[];
          setJobs(fetchedJobs);
        } else {
          setError("You must be an employer to view this page.");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const openModal = (jobId: number) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJobId(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center p-10">{error}</div>;

  return (
    <div className="pt-20 min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Manage Your Jobs
      </h1>
      {jobs.length === 0 ? (
        <p className="text-lg text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl p-4">
          {jobs.map((job) => (
            <div key={job.JobId} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">{job.Title}</h2>
              <p className="text-gray-600 mb-4">{job.Description}</p>
              <p className="font-medium text-gray-700 mb-2">
                Salary:{" "}
                {(job.Salary ?? 0).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  useGrouping: true,
                })}{" "}
                VND
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => {}}
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                  onClick={() => openModal(job.JobId)}
                >
                  View Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedJobId && <JobApplicants jobId={selectedJobId} />}
      </Modal>
    </div>
  );
};

export default ManageJobs;
