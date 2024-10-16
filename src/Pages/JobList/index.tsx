import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_GET_JOBS } from "../../Service/JobAPI";
import { JobList_Response } from "../../Types/job";
import { JobType } from "../../Types/constant";
import dayjs from "dayjs";

const JobList: React.FC = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState<JobList_Response[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState(location.state?.search || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const searchJobs = (await API_GET_JOBS({
        search,
        pageSize: 6,
        pageNumber: currentPage,
      })) as unknown as JobList_Response[];
      if (searchJobs) {
        setJobs(searchJobs);
        setSearch("");
      }
    };
    fetchData();
  }, [search]);

  const LoadMore = async () => {
    if (loading) return;
    setLoading(true);
    const searchJobs = (await API_GET_JOBS({
      search,
      pageSize: 6,
      pageNumber: currentPage + 1,
    })) as unknown as JobList_Response[];
    if (searchJobs) {
      setJobs([...jobs, ...searchJobs]);
    }
    setCurrentPage(currentPage + 1);
    setLoading(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Job Search</h1>
          <p className="text-center mb-4">
            Search for your desired job matching your skills
          </p>
          <div className="flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Enter Job title"
              className="border p-3 w-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Enter location"
              className="border p-3 w-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Years of experience"
              className="border p-3 w-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
              Search
            </button>
          </div>
        </div>

        {/* Job List Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-700">All Jobs (2310)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.JobId}
              className="bg-white p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={job.CompanyLogo}
                  alt={job.CompanyName}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{job.Title}</h3>
                  <p className="text-gray-500">{job.CompanyName}</p>
                </div>
              </div>
              <div className="mb-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs ${
                    JobType[job.JobType] === "FullTime"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {JobType[job.JobType]}
                </span>
              </div>
              <p className="text-gray-500 mb-2">Salary: {job.Salary}</p>
              <p className="text-gray-500 mb-2">
                Location: {job.CompanyLocation}
              </p>
              <div className="flex flex-row items-center justify-center mb-4">
                <p className="text-gray-500">
                  {dayjs(job.DateFrom).format("DD/MM/YYYY")}
                </p>
                <span className="text-gray-500 mx-2">-</span>
                <p className="text-gray-500">
                  {dayjs(job.DateTo).format("DD/MM/YYYY")}
                </p>
              </div>
              <div className="flex justify-between">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
                  View details
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Apply now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load more button */}
        <div className="flex justify-center mt-6">
          <button
            className="text-green-500 hover:text-green-700 underline"
            onClick={LoadMore}
          >
            View more
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobList;
