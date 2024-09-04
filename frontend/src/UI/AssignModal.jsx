import { useState } from "react";

function AssignModal({ isOpen, onClose, onSubmit, dropDown }) {
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-60 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Assign Care Manager</h2>
        <form onSubmit={(e) => onSubmit(e, { time })}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Staff
            </label>
            {dropDown}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignModal;
