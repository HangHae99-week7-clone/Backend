const { Post } = require("../models");

class postRepository {
  getAllPosts = async () => {
    const posts = await Post.findAll();
    return posts;
  };
  getPost = async (postId) => {
    const post = await Post.findOne({ where: { postId } });
    return post;
  };
  createPost = async (
    placename,
    category,
    content,
    charge,
    location,
    images,
    nickname
  ) => {
    const post = await Post.create({
      placename,
      category,
      content,
      charge,
      location,
      images,
      nickname,
    });
    return post;
  };
  deletePost = async (postId) => {
    const post = await Post.destroy({ where: { postId } });
    return post;
  };
  updatePost = async (
    postId,
    placename,
    category,
    charge,
    content,
    images,
    location
  ) => {
    const post = await Post.update(
      { placename, category, charge, content, images, location },
      { where: { postId } }
    );
    return post;
  };
  searchPost = async (location) => {
    console.log("111", location);
    const post = await Post.findAll({ where: { location } });
    console.log("???", post);
    return post;
  };
}
module.exports = postRepository;
