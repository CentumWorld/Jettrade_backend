const PortfolioVideo = require("../model/PortfolioVideoSchema");
const Franchise = require("../model/frenchiseSchema");
const stateHandler = require("../model/stateHandlerSchema");
const StateHandler = require("../model/stateHandlerSchema");

exports.getAllStates = async (req, res) => {
  try {
    const states = await StateHandler.find();
    if (!states) {
      return res.status(404).json({ message: "S.H.O not found" });
    }

    return res.status(200).json({ message: "Fetched all S.H.O", data: states });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//==============================================================
exports.getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();
    if (!franchises) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    return res
      .status(200)
      .json({ message: "Fetched all franchise", data: franchises });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.filterSHOByState = async (req, res) => {
  try {
    const { state } = req.body;

    const filteredDocuments = await stateHandler.find({ selectedState: state });

    res.status(200).json(filteredDocuments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.filterFranchiseByState = async (req, res) => {
  try {
    const { state } = req.body;

    const filteredDocuments = await Franchise.find({ franchiseState: state });

    res.status(200).json(filteredDocuments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createVideoForPortfolio = async (req, res) => {
  try {
    let title = req.body.title;

    const videoLocation = req.files["videoOne"][0]?.location;
    const thumbnailLocation = req.files["thumbnail"][0]?.location;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!videoLocation) {
      return res.status(400).json({ message: "Video file is required" });
    }
    if (!thumbnailLocation) {
      return res.status(400).json({ message: "Thumbnail file is required" });
    }
    const MAX_VIDEO_SIZE_BYTES = 1024 * 1024 * 1024;

    const videoFile = req.files["videoOne"][0];
    if (videoFile.size > MAX_VIDEO_SIZE_BYTES) {
      return res
        .status(400)
        .json({ message: "Video file size exceeds the maximum allowed size (1 GB)" });
    }
    const video = new PortfolioVideo({
      title,
      videoOne: videoLocation,
      thumbnail: thumbnailLocation,
    });

    const savedVideo = await video.save();

    res
      .status(201)
      .json({ message: "Video created successfully", video: savedVideo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllVideosForPortfolio = async (req, res) => {
  try {
    const videos = await PortfolioVideo.find();

    res.status(200).json({ videos });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};