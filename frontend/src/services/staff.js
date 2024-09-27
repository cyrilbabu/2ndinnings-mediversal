import { url } from "./url";
import axios from "axios";

export async function getAllStaff() {
  let newUrl = `${url}/api/staff/getAllStaff`;

  return await axios
    .get(newUrl)
    .then((res) => {
      if (res.status === 200) {
        // Store token in localStorage
        return res.data.staff; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("error in fetching staff:", error);
      throw error;
    });
}

export async function getStaffById(id) {
  let newUrl = `${url}/api/staff/getStaffById/${id}`;

  return await axios
    .get(newUrl)
    .then((res) => {
      if (res.status === 200) {
        // Store token in localStorage
        return res.data.staff; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("error in fetching staff:", error);
      throw error;
    });
}

export async function editStaff(data) {
  const apiUrl = `${url}/api/staff/updateStaff`;

  try {
    const response = await axios.post(apiUrl, data);

    if (response.status === 200) {
      return response.data.updatedStaff; // Assuming response.data contains the array of admin details
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
