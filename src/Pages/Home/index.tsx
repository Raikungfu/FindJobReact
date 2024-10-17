import React, { useEffect, useState } from "react";
import jobImage from "../../assets/bannerHomePage.png";
import { API_GET_JOB_CATEGORIES, API_GET_JOBS } from "../../Service/JobAPI";
import { JobType } from "../../Types/constant";
import dayjs from "dayjs";
import { JobCategory_Response, JobList_Response } from "../../Types/job";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const nav = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState<JobList_Response[]>([]);
  const [jobCategories, setJobCategories] = useState<JobCategory_Response[]>(
    []
  );

  const blogs = [
    {
      imgSrc:
        "https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg",
      title: "Lorem ipsum is placeholder text commonly used in the graphic...",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web",
    },
    {
      imgSrc:
        "https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...",
      description:
        "The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled",
    },
    {
      imgSrc:
        "https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg",
      title: "Excepteur sint occaecat cupidatat non proident, sunt in...",
      description:
        "Parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const fetchJobs = (await API_GET_JOBS({
        pageNumber: 0,
        pageSize: 6,
      })) as unknown as JobList_Response[];

      if (fetchJobs) {
        setFeaturedJobs(fetchJobs);
      }

      const fetchJobCategories =
        (await API_GET_JOB_CATEGORIES()) as unknown as JobCategory_Response[];

      if (fetchJobCategories) {
        const categoriesWithDefaultSelected = fetchJobCategories.map(
          (category) => ({
            ...category,
            Selected: category.Selected ?? false,
          })
        );
        setJobCategories(categoriesWithDefaultSelected);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nav("/find-job", { state: { search: "search" } });
    console.log(e.currentTarget);
  };

  return (
    <div className="pt-20 bg-white min-h-screen flex flex-col items-center justify-center text-center">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-gray-800 mt-10 font-big-shoulders">
        JOBBY
      </h1>
      <p className="text-3xl font-bold text-gray-800 mt-2 font-big-shoulders">
        Việc làm mê ly
      </p>
      <p className="text-gray-500 mt-2">
        Uy tín - Tận tâm - Nhanh chóng - Thuận tiện
      </p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative mt-8 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Tên công việc, từ khóa liên quan,..."
          className="w-full h-14 px-6 pl-12 rounded-full border border-gray-300 focus:outline-none focus:border-green-500"
        />
        {/* <img
          src={}
          alt="search icon"
          className="absolute left-4 top-3 h-8 w-8 text-gray-500"
        /> */}
        <button className="absolute right-2 top-2 h-10 px-6 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600">
          Tìm
        </button>
      </form>

      {/* Job People Illustration */}
      <div className="mt-10 px-6">
        <img
          src={jobImage}
          alt="Jobs People"
          className="w-full max-w-[60rem] mx-auto h-auto"
        />
      </div>
      {/* Featured Jobs Section */}
      <div className="mt-20 px-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Việc làm nổi bật</h2>
          <a href="/all-jobs" className="text-green-600 font-semibold text-lg">
            View All &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredJobs.map((job) => (
            <div key={job.JobId} className="border rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 max-w-20">
                  <img
                    src={
                      job.CompanyLogo ||
                      "data:image/png;base64,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"
                    }
                    alt={job.Title}
                    className="h-14 w-14 rounded-full border-2 border-black p-1"
                  />
                  <p className="text-gray-500 text-center mt-2 mb-3">
                    {job.JobCategoryName}
                  </p>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold h-14 pt-2 ">
                    {job.Title}
                  </h3>
                  <p className="text-gray-500 mt-2">{job.Salary}</p>
                  <p className="text-gray-500 mt-2">{JobType[job.JobType]}</p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center mb-4">
                <p className="text-gray-500">
                  {dayjs(job.DateFrom).format("DD/MM/YYYY")}
                </p>
                <span className="text-gray-500 mx-2">-</span>
                <p className="text-gray-500">
                  {dayjs(job.DateTo).format("DD/MM/YYYY")}
                </p>
              </div>
              <button className="w-full py-1.5 bg-green-600 font-semibold text-white rounded-full hover:bg-green-700 text-base ">
                Ứng tuyển ngay
              </button>
            </div>
          ))}
        </div>
      </div>
      <section className="py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            Các danh mục công việc
          </h2>
          <div className="flex justify-center space-x-4">
            {jobCategories.map((category, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center border p-4 w-36 h-32 rounded-lg ${
                  category.Selected ? "bg-green-500 text-white" : "bg-white"
                }`}
              >
                <img
                  src={category.Image}
                  alt={category.JobCategoryDescription}
                  className="h-10 w-10 mb-4 rounded-full"
                />
                <p>{category.JobCategoryName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Về chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.imgSrc}
                  alt="About"
                  className="w-30 h-auto object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-500 mb-4">{item.description}</p>
                  <a
                    href="#"
                    className="text-green-500 hover:text-green-700 flex items-center"
                  >
                    READ MORE
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
