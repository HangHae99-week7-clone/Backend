const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const ReviewController = require("../controllers/reviews.controller");

const reviewController = new ReviewController();

// 리뷰 등록
router.post("/:postId", authMiddleware, reviewController.createReview);
//리뷰 수정
router.put("/:reviewId", authMiddleware, reviewController.updateReview);
// 리뷰 삭제
router.delete("/:reviewId", authMiddleware, reviewController.deleteReview);

module.exports = router;
