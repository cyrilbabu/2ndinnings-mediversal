import { useState } from "react";
import { useAllPatient } from "../query/useAllPatient";
import { useAddAssignement } from "../query/useAddAssignement";
import DropDownStaff from "./DropDownStaff";
import AssignModal from "./AssignModal";
import SelectDropDown from "./SelectDropDown";
import StaffName from "./StaffDetails";
import StaffDetails from "./StaffDetails";
import { sendNotification } from "../services/firebase";

export default function AdminShowAllPatient({ role }) {
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { addAssignement, isLoading: addingAssignement } = useAddAssignement();
  const { isLoading, allPatient: patients } = useAllPatient();

  const handleChange = (e) => {
    setName(e.target.value.toLowerCase());
  };

  const handleOpenModal = (patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();

    addAssignement(
      {
        staff: selectedOption,
        role: selectedOption?.role,
        patient: selectedPatient,
        date: data.date,
        time: data.time,
      },
      {
        onSuccess: () => {
          sendNotification({
            title: "2nd innings mediversal",
            body: `New Assignement on ${data.date} at ${data.time} for patient ${selectedPatient.fullName}`,
            token: selectedOption.notificationToken,
          });
        },
      }
    );

    handleCloseModal();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-green-500"></div>
        <span className="ml-2 text-green-800">Loading...</span>
      </div>
    );
  }

  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(name)
  );

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Assign {role}</h1>
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
              <th className="px-5 py-3 w-2/7 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-5 py-3 w-1/7 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                DOB
              </th>
              <th className="px-5 py-3 w-1/7 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-5 py-3 w-1/7 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 w-1/7 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                {role}
              </th>
              <th className="px-5 py-3 w-1/7 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                Membership type
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient._id}>
                  <td className="px-5 py-3 w-2/7 border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {patient?.fullName}
                  </td>
                  <td className="px-5 py-3 w-1/7 border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {patient?.dob.split("T")[0]}
                  </td>
                  <td className="px-5 py-3 w-1/7 border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {patient?.phone}
                  </td>
                  <td className="px-5 py-3 w-1/7 border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {patient?.email}
                  </td>

                  <td className="px-5 py-1 w-1/7 border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {role === "Home Care Staff" || role === "Assessor" ? (
                      <button
                        onClick={() => handleOpenModal(patient)}
                        className="flex items-center justify-center w-full px-6 py-2 bg-green-600  text-white font-semibold text-sm  rounded-lg hover:bg-green-800"
                      >
                        Assign
                      </button>
                    ) : patient.careManager ? (
                      <StaffDetails id={patient.careManager} />
                    ) : (
                      <DropDownStaff
                        role={role}
                        patientId={patient._id}
                        patientName={patient.fullName}
                      />
                    )}
                  </td>
                  <td className="px-5 py-3 w-1/7 border-b-2 border-gray-200 text-left text-xs text-gray-600">
                    {patient?.plan}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-red-600 py-3">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AssignModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        dropDown={
          <SelectDropDown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            role={role}
          />
        }
      />
    </div>
  );
}
