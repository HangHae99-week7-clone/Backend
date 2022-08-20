const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const ReviewController = require("../controllers/reviews.controller");

const reviewController = new ReviewController();

// 리뷰 등록
router.post("/:postId", authMiddleware, reviewController.createReview);
router.put("/:reviewId", authMiddleware, reviewController.updateReview);
router.delete("/:reviewId", authMiddleware, reviewController.deleteReview);

module.exports = router;
