import { url } from "./url";
import axios from "axios";

export async function showAllPatient() {
  const apiUrl = `${url}/api/patient/getAllPatient`;

  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      return response.data.allPatient; // Assuming response.data contains the array of admin details
    } else {
      console.error(
        "Failed to fetch employee information:",
        response.data.error
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching employee information:", error);
    throw error;
  }
}

export async function assignCareManager(data) {
  const apiUrl = `${url}/api/patient/getAllPatient`;

  try {
    const response = await axios.post(apiUrl,data);

    if (response.status === 200) {
      return response.data.allPatient; // Assuming response.data contains the array of admin details
    } else {
      console.error(
        "Failed to fetch employee information:",
        response.data.error
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching employee information:", error);
    throw error;
  }
}
