import { url } from "./url";
import axios from "axios";

export async function addAssignement(data) {
  let newUrl = `${url}/api/staff/uploadAssignment`;

  return await axios
    .post(newUrl, data)
    .then((res) => {
      if (res.status === 200) {
        return res.data; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("add Assignment:", error);
      throw error;
    });
}
export async function getAllAssignement() {
  let newUrl = `${url}/api/staff/getAssignment`;

  return await axios
    .get(newUrl)
    .then((res) => {
      if (res.status === 200) {
        return res.data.assignmentDetails; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("get Assignment:", error);
      throw error;
    });
}
export async function updateAssignementDetails(formData) {
  try {
    const response = await axios.post(
      `${url}/api/staff/updateAssessment`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Success:", response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      // No response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error:", error.message);
    }
  }
}
