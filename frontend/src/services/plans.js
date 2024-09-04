import { url } from "./url";
import axios from "axios";

export async function getPlanDetails() {
  let newUrl = `${url}/api/patient/getPlanDetails`;

  return await axios
    .get(newUrl)
    .then((res) => {
      if (res.status === 200) {
        return res.data.planDetails; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("error in fetching plan:", error);
      throw error;
    });
}
