const { Post } = require("../models");
const { Keyword } = require("../models");
const { Roomtitle } = require("../models");
const { Roomcharge } = require("../models");
const { Roomimage } = require("../models");
class postRepository {
  getAllPosts = async () => {
    const posts = await Post.findAll();
    return posts;
  };

  getPost = async (postId) => {
    const post = await Post.findOne({ where: { postId } });
    const roomtitle = await Roomtitle.findAll({ where: { postId } });
    const roomcharge = await Roomcharge.findAll({ where: { postId } });
    const roomimage = await Roomimage.findAll({ where: { postId } });
    const keyword = await Keyword.findAll({ where: { postId } });
    let arr_title = [];
    let arr_charge = [];
    let arr_image = [];
    let arr_keyword = [];
    for (let i = 0; i < roomtitle.length; i++) {
      arr_title.push(roomtitle[i].title);
    }
    for (let i = 0; i < roomcharge.length; i++) {
      arr_charge.push(roomcharge[i].charge);
    }
    for (let i = 0; i < roomimage.length; i++) {
      arr_image.push(roomimage[i].image);
    }
    for (let i = 0; i < keyword.length; i++) {
      arr_keyword.push(keyword[i].keyword);
    }

    return {
      postId: post.postId,
      placename: post.placename,
      email: post.email,
      category: post.category,
      charge: post.charge,
      content: post.content,
      image: post.image,
      location: post.location,
      message: post.message,
      keyword: arr_keyword,
      roomtitle: arr_title,
      roomcharge: arr_charge,
      roomimage: arr_image,
    };
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
    const post = await Post.create({
      placename,
      category,
      content,
      charge,
      location,
      images,
      nickname,
      userId,
      message,
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
    location,
    message
  ) => {
    const post = await Post.update(
      { placename, category, charge, content, images, location, message },
      { where: { postId } }
    );

    return post;
  };
  searchPost = async (keyword) => {
    const post = await Keyword.findAll({ where: { keyword: keyword } });

    return post;
  };
}
module.exports = postRepository;
