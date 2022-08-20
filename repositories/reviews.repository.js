const { Review } = require("../models");

class ReviewRepository {
  findReview = async (reviewId) => {
    const findWriterData = await Review.findByPk(reviewId);
    return findWriterData;
  };

  createReview = async (nickname, comment, rating) => {
    const createReviewData = await Review.create({
      nickname,
      comment,
      rating,
    });
    return createReviewData;
  };

  updateReview = async (reviewId, comment, rating) => {
    const updateReviewData = await Review.update(
      { comment, rating },
      { where: { reviewId } }
    );
    return updateReviewData;
  };

  deleteReview = async (reviewId) => {
    const deleteReviewData = await Review.destroy({ where: { reviewId } });
    return deleteReviewData;
  };
}

module.exports = ReviewRepository;
