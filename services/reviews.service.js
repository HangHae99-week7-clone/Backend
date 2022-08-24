const ReviewRepository = require("../repositories/reviews.repository");

class ReviewController {
  reviewRepository = new ReviewRepository();

  createReview = async (postId, userId, nickname, comment, rating) => {
    await this.reviewRepository.createReview(
      postId,
      userId,
      nickname,
      comment,
      rating
    );
    const reviews = await this.reviewRepository.getReviews(postId);
    return { result: true, reviews };
  };

  updateReview = async (reviewId, userId, comment, rating) => {
    const review = await this.reviewRepository.findReview(reviewId);

    if (userId === review.userId) {
      return { result: false, error: "본인 리뷰만 수정 가능합니다" };
    }

    await this.reviewRepository.updateReview(reviewId, comment, rating);
    return { result: true };
  };

  deleteReview = async (reviewId, userId) => {
    const review = await this.reviewRepository.findReview(reviewId);

    if (userId === review.userId) {
      return { result: false, error: "본인 리뷰만 삭제 가능합니다" };
    }

    await this.reviewRepository.deleteReview(reviewId);
    return { result: true };
  };
}

module.exports = ReviewController;
