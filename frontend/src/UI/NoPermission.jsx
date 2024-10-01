import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoPermission = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Notification.permission === "granted") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen bg-green-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-800 mb-4">
          Please! Allow Notification Permission
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          You need to allow notification permissions to use this website.
          Notifications are required to get your assignments.
        </p>

        <p className="text-lg text-gray-600 mb-2">
          <p className="text-2xl font-bold text-gray-600 mb-2 mt-4">
            To reset notification permissions, follow these steps based on your
            browser:
          </p>
          <strong>For Google Chrome:</strong> <br />
          1. Click the three dots in the top-right corner and go to{" "}
          <strong>Settings</strong>. <br />
          2. Scroll down and click <strong>Privacy and security</strong> →{" "}
          <strong>Site Settings</strong>. <br />
          3. Click <strong>Notifications</strong> and find this site in the
          list. <br />
          4. Remove the site or change the permission to <strong>Allow</strong>.
          <br />
          <br />
          <strong>For Mozilla Firefox:</strong> <br />
          1. Click the padlock icon next to the URL and select{" "}
          <strong>More Information</strong>. <br />
          2. Go to the <strong>Permissions</strong> tab. <br />
          3. Uncheck <strong>Use Default</strong> next to notifications and
          select <strong>Allow</strong>.
          <br />
          <br />
          <strong>For Microsoft Edge:</strong> <br />
          1. Click the three dots in the top-right corner and go to{" "}
          <strong>Settings</strong>. <br />
          2. Navigate to <strong>Cookies and site permissions</strong> →{" "}
          <strong>Notifications</strong>. <br />
          3. Find the site and set notifications to <strong>Allow</strong>.
          <br />
          <br />
          <p className="text-xl font-bold text-green-700 mb-2 mt-4">
            After following these steps, reload this page to continue using the
            website.
          </p>
        </p>
      </div>
    </div>
  );
};

export default NoPermission;
