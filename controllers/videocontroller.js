const Video = require("../model/videoModel");

// Create a new video
exports.createVideo = async (req, res, next) => {
  try {
    const { title } = req.body;
    const fileUrl = req.file.location; // Assuming your upload middleware sets the 'location' property
    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }
    if (!fileUrl) {
      return res
        .status(400)
        .send({ status: false, message: "video file is required" });
    }

    // Save the video information to MongoDB
    const video = new Video({
      title,
      videoOne: fileUrl,
    });

    const savedVideo = await video.save();

    res.status(201).json({ status: true, savedVideo });
  } catch (error) {
    console.error("Failed to create video:", error);
    res.status(500).json({ error: "Failed to create video" });
  }
};
