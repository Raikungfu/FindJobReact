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
                <div className="flex-shrink-0">
                  <img
                    src={job.CompanyLogo}
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
