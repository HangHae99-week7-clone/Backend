const { Post, Review } = require("../models");
const postRepository = require("../repositories/posts.repository");
const { Keyword } = require("../models");
const { Roomtitle } = require("../models");
const { Roomcharge } = require("../models");
const { Roomimage } = require("../models");

class PostService {
  postRepository = new postRepository();

  getAllPosts = async () => {
    const posts = await this.postRepository.getAllPosts();
    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return Promise.all(
      posts.map(async (post) => {
        const getPost = await this.postRepository.getPost(post.postId);
        return getPost;
      })
    );
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
    nickname,
    userId,
    message
  ) => {
    const post = await this.postRepository.createPost(
      placename,
      category,
      content,
      charge,
      location,
      images,
      nickname,
      userId,
      message
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
    location,
    message
  ) => {
    const post = await this.postRepository.updatePost(
      postId,
      placename,
      category,
      charge,
      content,
      images,
      location,
      message
    );
    return post;
  };
  deletePost = async (postId) => {
    const post = await this.postRepository.deletePost(postId);
    return post;
  };
  searchPost = async (arr_keyword) => {
    const post = await this.postRepository.searchPost(arr_keyword);
    let postarray = [];
    for (let i = 0; i < post.length; i++) {
      let searchpost = await this.postRepository.getPost(post[i]);
      postarray.push(searchpost);
    }
    return postarray;
  };
}
module.exports = PostService;
