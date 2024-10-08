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

export async function showPatientById(id) {
  const apiUrl = `${url}/api/patient/getPatientById/${id}`;

  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      return response.data.patient; // Assuming response.data contains the array of admin details
    } else {
      console.error("PatientById:", response.data.error);
      return null;
    }
  } catch (error) {
    console.error("PatientById:", error);
    throw error;
  }
}

export async function assignCareManager(data) {
  const apiUrl = `${url}/api/patient/assignCareManager`;

  try {
    const response = await axios.post(apiUrl, data);

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

export async function updatePatient(data) {
  const apiUrl = `${url}/api/patient/updateCallDetails`;

  try {
    const response = await axios.put(apiUrl, data);

    if (response.status === 200) {
      console.log(response);
      return response.data.updatedPatient; // Assuming response.data contains the array of admin details
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

export async function editPatient(data) {
  const apiUrl = `${url}/api/patient/updatePatient`;

  try {
    const response = await axios.put(apiUrl, data);

    if (response.status === 200) {
      console.log(response);
      return response.data.updatedPatient; // Assuming response.data contains the array of admin details
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


export async function patientRegister(data) {
  let newUrl = `${url}/api/patient/register`;

  return await axios
    .post(newUrl, data)
    .then((res) => {
      if (res.status === 200) {
        return res.data.user; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("Register error:", error);
      throw error;
    });
}



