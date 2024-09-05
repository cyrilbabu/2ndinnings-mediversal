import { useState } from "react";
import { useAllStaff } from "../query/useAllStaff";
import BackButton from "../UI/back-button";

export default function ViewAllStaff() {
  const [name, setName] = useState("");
  const { isLoading, allStaff: staffs = [] } = useAllStaff();
  console.log("ye le ", staffs);

  const handleChange = (e) => {
    setName(e.target.value.toLowerCase());
  };

  const filteredStaffs = staffs.filter((staff) => {
    const fullName = staff.fullname || staff.name || ""; // Check for fullname or name property
    return fullName.toLowerCase().includes(name);
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-green-500"></div>
        <span className="ml-2 text-green-800">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <BackButton />
      <h1 className="text-3xl font-bold text-green-800 mb-6">All staff</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="w-full rounded my-2">
          <input
            type="text"
            placeholder="Enter name, phone, or email"
            value={name}
            onChange={handleChange}
            className="shadow my-1 appearance-none border rounded w-full
              py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
          />
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                Password
              </th>
              <th className="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff) => (
                <tr key={staff._id} className="hover:bg-green-200">
                  <td className="px-5 py-3  border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {staff.name}
                  </td>
                  <td className="px-5 py-3  border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {staff.username}
                  </td>
                  <td className="px-5 py-3  border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {staff.phone}
                  </td>
                  <td className="px-5 py-3  border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {staff.password}
                  </td>
                  <td className="px-5 py-3  border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {staff.role}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-red-600 py-3">
                  No Staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
