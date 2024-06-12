const reviewsServices = require("../../services/User/review.service");
const reviewsService = new reviewsServices();

exports.createReview = async (req, res) => {
  const { delivery_id, reviews } = req.body;

  try {
    const response = await reviewsService.createReview(delivery_id, reviews);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getReciewWithUser = async (req, res) => {
  const userId = req.userId;
  try {
    const response = await reviewsService.getReciewWithUser(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const response = await reviewsService.deleteReview(reviewId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
