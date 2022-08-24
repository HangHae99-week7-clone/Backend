const Post = require("../models/post");
const postRepository = require("../repositories/posts.repository");
const { Keyword } = require("../models");
const { Roomtitle } = require("../models");
const { Roomcharge } = require("../models");
const { Roomimage } = require("../models");
const { Review } = require("../models");
class PostService {
  postRepository = new postRepository();
  getAllPosts = async () => {
    const posts = await this.postRepository.getAllPosts();

    let arr_title = [];
    let arr_charge = [];
    let arr_image = [];
    let arr_keyword = [];
    let arr_review = [];
    for (let i = 0; i < posts.length; i++) {
      const roomtitle = await Roomtitle.findAll({
        where: { postId: posts[i].postId },
      });
      for (let j = 0; j < roomtitle.length; j++) {
        arr_title.push(roomtitle[j].title);
      }

      const roomcharge = await Roomcharge.findAll({
        where: { postId: posts[i].postId },
      });
      for (let j = 0; j < roomcharge.length; j++) {
        arr_charge.push(roomcharge[j].charge);
      }
      const roomimage = await Roomimage.findAll({
        where: { postId: posts[i].postId },
      });
      for (let j = 0; j < roomimage.length; j++) {
        arr_image.push(roomimage[j].image);
      }

      const keyword = await Keyword.findAll({
        where: { postId: posts[i].postId },
      });

      for (let j = 0; j < roomtitle.keyword; j++) {
        arr_keyword.push(roomkeyword[j].keyword);
      }

      const review = await Review.findAll({
        where: { postId: posts[i].postId },
      });
      for (let j = 0; j < review.length; j++) {
        arr_review.push(review[j].comment);
      }
    }
    return posts.map((post) => {
      return {
        postId: post.postId,
        placename: post.placename,
        email: post.email,
        category: post.category,
        charge: post.charge,
        images: post.images,
        location: post.location,
        message: post.message,
        keyword: arr_keyword,
        roomtitle: arr_title,
        roomcharge: arr_charge,
        roomimage: arr_image,
        review: arr_review,
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
      postId,
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
