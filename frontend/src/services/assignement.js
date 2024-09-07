import { url } from "./url";
import axios from "axios";

export async function addAssignement(data) {
  let newUrl = `${url}/api/staff/updateassessment`;

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

export async function updateAssignementDetails(data) {
  let newUrl = `${url}/api/staff/updateAssessment`;

  return await axios
    .post(newUrl, data)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data; // Return the email to be used in the onSuccess callback
        console.log("Success:", response.data);
      }
    })

    .catch((error) => {
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
    });
}
