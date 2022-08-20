const postRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new postRepository();
  getAllPosts = async () => {
    const posts = await this.postRepository.getAllPosts();

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return posts.map((post) => {
      return {
        postId: post.postId,
        placename: post.placename,
        category: post.category,
        charge: post.charge,
        images: post.images,
        location: post.location,
      };
    });
  };
  getPost = async (postId) => {
    const post = await this.postRepository.getPost(postId);
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
    const post = await this.postRepository.createPost(
      placename,
      category,
      content,
      charge,
      location,
      images,
      nickname
    );
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
    const post = await this.postRepository.updatePost(
      placename,
      postId,
      category,
      charge,
      content,
      images,
      location
    );
  };
  deletePost = async (postId) => {
    const post = await this.postRepository.deletePost(postId);
    return post;
  };
  searchPost = async (location) => {
    const post = await this.postRepository.searchPost(location);
    return post;
  };
}
module.exports = PostService;
