import { url } from "./url";
import axios from "axios";

export async function login(data) {
  let newUrl = `${url}/api/staff/login`;

  return await axios
    .post(newUrl, data)
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token); // Store token in localStorage
        return res.data.user; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      throw error;
    });
}
