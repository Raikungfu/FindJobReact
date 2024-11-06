import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_COUNT_JOBS, API_GET_JOBS } from "../../Service/JobAPI";
import { JobList_Response } from "../../Types/job";
import { JobType } from "../../Types/constant";
import dayjs from "dayjs";
import { applyForJob } from "../../utils/jobUtils";
const JobList: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobList_Response[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [jobsCount, setJobsCount] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchJobsCount = async () => {
    try {
      const count = await API_COUNT_JOBS();
      setJobsCount(count);
    } catch (error) {
      console.error("Error fetching job count:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const searchJobs = (await API_GET_JOBS({
        search: { title, location: locationSearch, category },
        pageSize: 6,
        pageNumber: currentPage,
      })) as unknown as JobList_Response[];
      if (searchJobs) {
        setJobs(searchJobs);
        fetchJobsCount();
      }
    };
    fetchData();
  }, [title, locationSearch, category, currentPage]);

  const LoadMore = async () => {
    if (loading) return;
    setLoading(true);
    const searchJobs = (await API_GET_JOBS({
      search: { title, location: locationSearch, category },
      pageSize: 6,
      pageNumber: currentPage + 1,
    })) as unknown as JobList_Response[];
    if (searchJobs) {
      setJobs([...jobs, ...searchJobs]);
    }
    setCurrentPage(currentPage + 1);
    setLoading(false);
    fetchJobsCount();
  };
  const handleViewDetails = (jobId: number) => {
    navigate(`/job/${jobId}`);
  };
  const handleSearch = () => {
    setCurrentPage(0);
    fetchJobsCount();
  };
  const handleApply = async (jobId: number) => {
    const success = await applyForJob(jobId);
    if (success) {
      alert("Application successful!");
    } else {
      alert("Application failed. Please try again.");
    }
  };
  console.log(jobs);
  return (
    <div className="pt-20 min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Tìm Kiếm Công Việc
          </h1>
          <p className="text-center mb-4">
            Tìm công việc phù hợp với kỹ năng của bạn
          </p>
          <div className="flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Nhập Tiêu đề Công việc"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 w-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Nhập Địa điểm"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="border p-3 w-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Danh mục Công việc"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 w-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
              onClick={handleSearch} // Gọi hàm tìm kiếm
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Job List Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-700">
            Tổng số công việc hiện tại ({jobsCount})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.JobId}
              className="bg-white p-4 border rounded-lg shadow hover:shadow-lg transition-shadow h-full flex flex-col justify-between"
            >
              <div className="flex items-center mb-4">
                <img
                  src={
                    job.CompanyLogo ||
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX////b29tra2t4eHje3t7Y2NjV1dVzc3PS0tLNzc1lZWXLy8vg4OBycnJoaGjIyMjCwsK6urpgYGCqqqrw8PD5+fmysrKCgoKZmZno6OicnJy9vb2SkpKMjIympqaioqJ/f38GGKbxAAAIwUlEQVR4nO2diZKjIBBA4xWP4H3GaPT/v3LBI4lGEwWyNFO+qtnZndoqeUPTQEv0dDo4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODj4b6QjohvClTRB1i2Lm6Kq6zrP8xZ/5XVdVUUTZzdbvyaiW8jE1S9zzXVdk6BN6H7kuqrb1qUvqWUS5qY781oE/6/mKrq1+1Eq1d1gN0p6d8n6UanVLb336qj5ohu9g6TZ60dwC2ly7Fmj8Ou6URfd9G3cVCq/rhsD0Y3fAoOgpqmx6OZ/57wjgy71YiFa4BtpyySIFSvg+SZk60KMWYNWZO5C8IqIJc2MuJVojQ/4zEHaKQLOqCXdXP+mCHWRalEuZt4NM9Eqy2Q8BuEAyE7kKejeRNssYHEU1LQW4IzBJYs+cOHtFm98DbVctNAb+Vsb57Wn8aekANUXp7pvK4aqJdpoxnXaUtPNq6KqSaGtL7P1PlpeV+U9CwPfv2D8IIybql0uV9WilWbYr0Fqmo2t6EhXFMPyw7is6rpq4tC3zgb+MdIJCoZ8R7pxifOFEFeBld+ylzaa1RkpI8RhRFlB14P8rR/di2inKc2zheYdramsoqNmruiGop2mPBekZrlfEIPieVEc2PK7eLSvXQ3GL91YzZJVI9ppyiPI3ButoT8zLEU7TcnG5uWUgjhO66khsJrUuKShSTOj4TTZQDMc50PXp+5DPZsaAotSZZwPz7SCb4bAMg0aDGtqwTdDYLPFsC41C+phqOjTGdEEVslImBONot8nhtC2+YOhm1EnGgXNDIGtS9OhWQE/Q2gbxKFdF2rBeZSqSLTSjJZ1sngzhFZQ7KsYOX2imedSVbTRnJp1spjPh61oozm9IUMqnRlCW5aeTt3uzqRflWLD28QQ2IQ/bPJNej9sGLwawjuW0SXCmmEYKoo9MTREG80hg8i8MwSpohivhtCKif0RBZYVDQZNljTgbs0ExJBhvieG1YshvPsW3SafqQsnU74J77QCOQtVMxoGz8I5tP0v5qpqZslmqOgvfQis4o1JVKbtb2/4rLa5tmihd1S2NVvHc0YEt3c6ke2TG7Ia6vE4EiGeqClMxumwUwyGwjfEkwqZ6TJs8B+KQ2m5PiWGASpS09R2XYvdUEFdscAsE4P8Q7TWE2QolmuyLWl6+lqGG3dpGdDqmzStMA0ehuQejzmUzg04o5E0zdd4GOJYwH1oQDRUjJqLofJyAwtQlJJRgxo+hvUwCAmivZ6QJukhF0O9ei7gAeXSK2mPxceweU46gPb5CZ8A7TAeXWgAWrql/ARfXeGk0j6ZcgfQMOxTDW8gBemQangjWmrCLwwBZdIT32Q6AinP/CSZgsozvzCElWdOP5guAK26e7gbwsqkpx9MiLAy6Ym/IbhhyH1CBLUm7eBtCO/xCrwNwQ1D7obggpTzss2A14WnE1dDYCu2nhRxc4R1w+KF5MrF0VDATYVPUubba4aCAPud2DMqvJXMHOaMKlrgKymjIdQU8wLjQIQ4Dc5gG4jwhyHzQIS3VnuDrV4Db0OxANNOGFxtZgmmgQjwqNc7TGEK73EfS7AYgju9vghDmNpyGNIva/RMinHIEqYltA/krUA76ethKcVscaLtRN1uGvhbix66XHOO740Ua5oT5ZRoZHF8l2Dz1ENRryGCcSyN4f5d4jkjSGS4M53qVtYjj+G+ONUvmXyGuzZRQRb2SGW4XdEKn8hluO3gvuGHtwdyGV5Da0NGtTuzICBf+E+pDJPb7esHTOxgimSGpMmfItXAfj4m6L91f5XKMO0bvXYy2rr4C0hleLKHVl/I8yAnnWdY9qV79uUcyQyti21fLnbXdNu2rXOHZdnrXOQyVD6oEKwn4z9suQyv1n7kMkyGuNyDXIbp2diNXIY05ZrDEBgUt4P/vqEstbYBijuJhyEwaO4Gi27zPmgMJTip8ALN0ZrDEBYUgpDPXS5AY2gAP3s5hcaQfM45kSVUEzpDcoj2KoMjtV8PdMeU/cC3gQA7cvAD7cjJr3OEGKsp7w8HQdsx8uu/Hv0S5ZBOETHmzyVMz4s0H0iwJnebtx8qHFVVvcgMIax0Qifm/UFZFBLBzlGNRTtaWqRy9lN0W33ieI1IR5RHnsfysPJlNE99dYwqUYk1KSPcFIf5sZAzUO2oU7yoFpFYk9jrWhJxzjOomQt2ju1/PwoeqkNDIr5TIcoWBDtHLfyfk4fvPtoR8RW8LQsSR8eL/5fjWYueuSDi8VjIh2CwKtgnneZ/fARMqaPXXBexvDRgLuh7q3ajY/Hr6vG1cqatcJgfIvwUDLxvhsSxPv/QL22ct1Re8ZoP0W2DILmio/0qsaZZtDRMOCXTtSy65Bipt18knUBdbAKndSm6R1sFCZGa8V7NWe1aC3g8glY3ql2C5Dfr3Xkm1us0gU4v1TB3Irpom0P01ZHbijVt1v3IlQI2RR3FzqYc837lKOfycZvA+/IL9myWGQPZLUUHjpeOWubJQ1kdgM/LqD79OzqN+7ZJYt2xZMqrXwL0oRjSKeooM+k7cMAxGe4h+8szxMJVSrQ/UnUUapQjcILn0L4zMcm3p3BHva2/gHtZz4hdHn6EiO71rMG+60f5TdkaqzpS/OJbAtt1cYr30yT13jkYLxjvNvoarTruPb/kEp4vOLsVfZrfMN6ltk2gYMtlTSyHkJ/VpsPZj0Kx2NuBIx5uvFZkgaVjTSLUQ/6uW0FWtt4P7DqcPW/dQ2wp3MMWkeNqdVUUDaEsqrp18c8ctrnvM9H21+7tTDFreB2OQ7y8X6qNRFuLjvv2MYDwNr7DtJRVcGu2ucgriON0y/Mn2v8wYH6H9z1OzzJ3IVkffzUspO5CHKdfSxtydyGpbn4RtGU3VJ0vnSh7kJLC2GdD6QUxH9OpznHLJoroY81/e2UdLl79yTD/C1HqfAjTRHTjuPBp6Sb5gmbg05QY/4FhiIn++DAk50NWh+HfEFSd1XLG3xiGeCC2f3wY4k6c3Kv5B+H/ytpEiEa3AAAAAElFTkSuQmCC"
                  }
                  alt={job.CompanyName}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-4 overflow-hidden">
                  <h3 className="text-lg font-semibold">{job.Title}</h3>
                  <p className="text-gray-500  overflow-hidden whitespace-nowrap  max-w-full truncate ">
                    {job.CompanyName}
                  </p>
                </div>
              </div>
              <div className="mb-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs ${
                    job.JobType === JobType.FullTime
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {job.JobType}
                </span>
              </div>
              <p className="text-gray-500 mb-2">
                Lương:{" "}
                {(job.Salary ?? 0).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  useGrouping: true,
                })}{" "}
                VND
              </p>
              <p className="text-gray-500 mb-2">Location: {job.Location}</p>
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
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                  onClick={() => handleViewDetails(job.JobId)}
                >
                  View details
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  onClick={() => handleApply(job.JobId)}
                >
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
