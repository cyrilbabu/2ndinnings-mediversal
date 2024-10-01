import admin from "firebase-admin";
import serviceAccount from "./second-innings-e38f7-firebase-adminsdk-lkfqa-d9e4f670f7.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
    console.log("Notification Sent", response);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Notification error", error);
    return res
      .status(500)
      .json({ error: "Error in sendNotification controller", error });
  }
};
