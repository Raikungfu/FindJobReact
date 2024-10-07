import React from "react";
import jobImage from "../../assets/bannerHomePage.png";
import iconCategory from "../../assets/iconCategory.png";

const Home: React.FC = () => {
  const featuredJobs = [
    {
      id: 1,
      title: "Quản lý dự án",
      companyLogo:
        "data:image/jpeg;base64,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",
      salary: "$2,000 - 5,000 / Tháng",
      category: "Quản lý",
      location: "Địa điểm",
      time: "Thời Gian",
    },
    // Bạn có thể thêm các công việc khác vào danh sách này
    {
      id: 2,
      title: "Quản lý dự án",
      companyLogo:
        "data:image/png;base64,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",
      salary: "$2,000 - 5,000 / Tháng",
      category: "Quản lý",
      location: "Địa điểm",
      time: "Thời Gian",
    },
    {
      id: 3,
      title: "Quản lý dự án",
      companyLogo:
        "data:image/png;base64,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",
      salary: "$2,000 - 5,000 / Tháng",
      category: "Quản lý",
      location: "Địa điểm",
      time: "Thời Gian",
    },
    {
      id: 4,
      title: "Quản lý dự án",
      companyLogo:
        "data:image/png;base64,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",
      salary: "$2,000 - 5,000 / Tháng",
      category: "Quản lý",
      location: "Địa điểm",
      time: "Thời Gian",
    },
    {
      id: 5,
      title: "Quản lý dự án",
      companyLogo:
        "data:image/png;base64,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",
      salary: "$2,000 - 5,000 / Tháng",
      category: "Quản lý",
      location: "Địa điểm",
      time: "Thời Gian",
    },
    {
      id: 6,
      title: "Quản lý dự án",
      companyLogo:
        "data:image/png;base64,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",
      salary: "$2,000 - 5,000 / Tháng",
      category: "Quản lý",
      location: "Địa điểm",
      time: "Thời Gian",
    },
  ];
  const categories = [
    { name: "Nhân viên gian hàng", icon: iconCategory },
    { name: "Dọn dẹp", icon: iconCategory, selected: true },
    { name: "Giao hàng", icon: iconCategory },
    { name: "Sự kiện", icon: iconCategory },
    { name: "Hộ gia đình", icon: iconCategory },
    { name: "Khác", icon: iconCategory },
  ];
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
      <div className="relative mt-8 w-full max-w-2xl">
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
      </div>

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
            <div key={job.id} className="border rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    src={job.companyLogo}
                    alt={job.title}
                    className="h-14 w-14 rounded-full border-2 border-black p-1"
                  />
                  <p className="text-gray-500 text-center mt-2 mb-3">
                    {job.category}
                  </p>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold h-14 pt-2 ">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 mt-2 mb-3">{job.salary}</p>
                </div>
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
            {categories.map((category, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center border p-4 w-36 h-32 rounded-lg ${
                  category.selected ? "bg-green-500 text-white" : "bg-white"
                }`}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="h-10 w-10 mb-4 rounded-full"
                />
                <p>{category.name}</p>
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
