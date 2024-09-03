import { useState } from "react";
import { useAllStaff } from "../query/useAllStaff";
import { useAssignCareManager } from "../query/useAssignCareManager";

/* eslint-disable react/prop-types */
const DropDownStaff = ({ role, patientId }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { isLoading: loadingStaff, allStaff } = useAllStaff();
  const { assignCareManager, isLoading: assigningManager } =
    useAssignCareManager();

  const handleChange = (event) => {
    const staffId = event.target.value;
    setSelectedOption(staffId);

    if (staffId) {
      console.log({ staffId, patientId });
      assignCareManager({ staffId, patientId });
    }
  };

  if (loadingStaff || assigningManager) {
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
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Select A Care Manager</option>
        {filteredStaff.map((staff) => (
          <option key={staff._id} value={staff._id}>
            {staff.name} ({staff.username})
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownStaff;
