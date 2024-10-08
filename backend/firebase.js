import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  }),
});

export const sendNotification = async (req, res) => {
  try {
    const { title, body, token } = req.body;

    // Validate the token
    if (!token) {
      return res
        .status(400)
        .json({ error: "Token is required to send notification." });
    }

    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: token, // Ensure this is not undefined or empty
    };

    // Send the notification
    const response = await admin.messaging().send(message);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Notification error", error);
    return res
      .status(500)
      .json({ error: "Error in sendNotification controller", error });
  }
};
