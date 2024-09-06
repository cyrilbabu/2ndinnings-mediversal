import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorised = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen bg-green-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-800 mb-4">
          You Are Not Authorised
        </h1>
        {/* <p className="text-2xl font-semibold text-gray-800 mb-2">
          $03
        </p> */}
        <p className="text-lg text-gray-600 mb-2">
          You do not have the necessary permissions to access this page
        </p>
      </div>
      <div className="mt-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-800 rounded-full px-3 py-2"
        >
          <div className="flex justify-center text-white  items-center">
            {/* <IoIosArrowBack /> */}
            Go Back
          </div>
        </button>
      </div>
    </div>
  );
};

export default NotAuthorised;
