const ReviewRepository = require("../repositories/reviews.repository");

class ReviewController {
  reviewRepository = new ReviewRepository();

  createReview = async (nickname, comment, rating) => {
    await this.reviewRepository.createReview(nickname, comment, rating);
  };

  updateReview = async (reviewId, nickname, comment, rating) => {
    const review = await this.reviewRepository.findReview(reviewId);

    if (nickname === review.nickname) {
      return { result: false, error: "본인 리뷰만 수정 가능합니다" };
    }

    await this.reviewRepository.updateReview(reviewId, comment, rating);
    return { result: true };
  };

  deleteReview = async (reviewId, nickname) => {
    const review = await this.reviewRepository.findReview(reviewId);

    if (nickname === review.nickname) {
      return { result: false, error: "본인 리뷰만 삭제 가능합니다" };
    }

    await this.reviewRepository.deleteReview(reviewId);
    return { result: true };
  };
}

module.exports = ReviewController;
