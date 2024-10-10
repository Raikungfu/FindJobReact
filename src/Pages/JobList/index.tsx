import React from "react";

const jobs = [
  {
    id: 1,
    title: "Giặt rửa chăn nệm",
    type: "PART-TIME",
    salary: "20,000 INR - 25,000 INR",
    company: "Google Inc.",
    typeJob: "Dọn dẹp",
    location: "New Delhi, India",
    applicants: "10+ applicants",
    companyLogo: "google-logo.png",
  },
  {
    id: 2,
    title: "Senior UI/UX Designer",
    type: "FULL-TIME",
    salary: "30,000 - 55,000",
    company: "Apple",
    location: "Boston, USA",
    applicants: "9+ applicants",
    companyLogo: "apple-logo.png",
  },
  // Add more jobs as needed
];

const JobList: React.FC = () => {
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
              key={job.id}
              className="bg-white p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-500">{job.company}</p>
                </div>
              </div>
              <div className="mb-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs ${
                    job.type === "FULL-TIME"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {job.type}
                </span>
              </div>
              <p className="text-gray-500 mb-2">Salary: {job.salary}</p>
              <p className="text-gray-500 mb-2">Location: {job.location}</p>
              <p className="text-gray-500 mb-4">{job.applicants}</p>
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
          <button className="text-green-500 hover:text-green-700 underline">
            View more
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobList;
