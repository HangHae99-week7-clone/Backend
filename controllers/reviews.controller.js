const ReviewService = require("../services/reviews.service");

class ReviewController {
  reviewService = new ReviewService();

  // 리뷰 등록 [POST] /review/:postId
  createReview = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId, nickname } = res.locals.user;
      const { comment, rating } = req.body;
      const createReview = await this.reviewService.createReview(
        postId,
        userId,
        nickname,
        comment,
        rating
      );

      res.json(createReview);
    } catch (err) {
      return next(err);
    }
  };

  // 리뷰 수정 [PUT] /review/:reviewId
  updateReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { userId, nickname } = res.locals.user;
      const { comment, rating } = req.body;
      const updateReview = await this.reviewService.updateReview(
        reviewId,
        userId,
        nickname,
        comment,
        rating
      );

      res.json(updateReview);
    } catch (err) {
      return next(err);
    }
  };

  // 리뷰 삭제 [DELETE] /review/:reviewId
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { userId } = res.locals.user;

      const deleteReview = await this.reviewService.deleteReview(
        reviewId,
        userId
      );

      res.json(deleteReview);
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = ReviewController;
