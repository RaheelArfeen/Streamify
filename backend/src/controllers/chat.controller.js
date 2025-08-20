import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user._id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not generate Stream token" });
  }
}
