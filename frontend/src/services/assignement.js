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
export async function updateAssignementDetails(data) {
  let newUrl = `${url}/api/staff/updateAssessment`;

  return await axios
    .post(newUrl, data)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.assignment);
        return res.data.assignment; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("add Assignment:", error);
      throw error;
    });
}
