import { url } from "./url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export async function login(data) {
  let newUrl = `${url}/api/staff/login`;

  return await axios
    .post(newUrl, data)
    .then((res) => {
      if (res.status === 200) {
        return res.data.user; // Return the email to be used in the onSuccess callback
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      throw error;
    });
}

function logout() {
  localStorage.clear();
}

export default logout;

