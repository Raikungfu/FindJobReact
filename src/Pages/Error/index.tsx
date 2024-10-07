import React from "react";
import { Link } from "react-router-dom";

const Page404: React.FC = () => {
  return (
    <main className="grid place-items-center bg-white h-screen overflow-hidden">
      <div className="text-center">
        <h1 className="font-extrabold dark:text-red-600">404</h1>
        <h1 className="text-indigo-600 dark:text-indigo-600">
          Page not found!
        </h1>

        <p className="mt-6 text-base leading-7 text-white-600 dark:text-white-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link id="goBack-btn" to="/" className="access-link">
            <p>
              <span aria-hidden="true">&larr;</span> Go back home
            </p>
          </Link>
          <Link id="contact-btn" to="/contact-us" className="access-link">
            <p>
              Contact support <span aria-hidden="true">&rarr;</span>
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
};
export default Page404;
