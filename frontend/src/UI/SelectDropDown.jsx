/* eslint-disable react/prop-types */
import { useAllStaff } from "../query/useAllStaff";

const SelectDropDown = ({ selectedOption, setSelectedOption, role }) => {
  const { isLoading: loadingStaff, allStaff } = useAllStaff();

  const handleChange = (event) => {
    const selectedStaffId = event.target.value;
    const selectedStaff = allStaff.find(
      (staff) => staff._id === selectedStaffId
    );
    setSelectedOption(selectedStaff);
  };

  if (loadingStaff) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-green-500"></div>
        <span className="ml-2 text-green-800">Loading...</span>
      </div>
    );
  }

  const filteredStaff = allStaff.filter((staff) => staff.role === role);

  return (
    <div className="w-full">
      <select
        className="w-full border p-2 rounded shadow"
        id="dropdown"
        value={selectedOption?._id || ""}
        onChange={handleChange}
      >
        <option value="">Select {role}</option>
        {filteredStaff.map((staff) => (
          <option key={staff._id} value={staff._id}>
            {staff.name} ({staff.username})
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropDown;
