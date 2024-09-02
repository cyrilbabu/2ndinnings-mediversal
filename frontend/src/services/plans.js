import { url } from "./url";
import axios from "axios";

export async function getPlanDetails(plan) {
  let newUrl = `${url}/api/staff/login/${plan}`;

  return await axios
    .get(newUrl)
    .then((res) => {
      if (res.status === 200) {
             // Store token in localStorage
        return res.data.user; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("error in fetching plan:", error);
      throw error;
    });
}
