const PostService = require("../services/posts.service");
const { Keyword } = require("../models");
const { Roomtitle } = require("../models");
const { Roomcharge } = require("../models");
const { Roomimage } = require("../models");
class PostController {
  postService = new PostService();
  searchPost = async (req, res, next) => {
    const { keyword } = req.query;

    const searchPost = await this.postService.searchPost(keyword);
    res.status(200).json({ Result: searchPost });
  };
  getAllPosts = async (req, res, next) => {
    const posts = await this.postService.getAllPosts();
    res.status(200).json({ Result: posts });
  };
  createPost = async (req, res, next) => {
    const { user } = res.locals;

    const {
      placename,
      category,
      content,
      charge,
      keyword,
      location,
      images,
      message,
      roomtitle,
      roomcharge,
      roomimage,
    } = req.body;

    const createPost = await this.postService.createPost(
      placename,
      category,
      content,
      charge,
      location,
      images,
      user.nickname,
      user.id,
      message
    );
    let arr_keyword = keyword.toString().split(" ");
    let arr_roomtitle = roomtitle.toString().split(" ");
    let arr_roomcharge = roomcharge.toString().split(" ");
    let arr_roomimage = roomimage.toString().split(" ");

    for (let i = 0; i < arr_keyword.length; i++) {
      const createKeyword = await Keyword.create({
        keyword: arr_keyword[i],
        postId: createPost.postId,
      });
    }
    for (let i = 0; i < arr_roomtitle.length; i++) {
      const createRoomtitle = await Roomtitle.create({
        title: arr_roomtitle[i],
        postId: createPost.postId,
      });
    }
    for (let i = 0; i < arr_roomcharge.length; i++) {
      const createRoomcharge = await Roomcharge.create({
        charge: arr_roomcharge[i],
        postId: createPost.postId,
      });
    }
    for (let i = 0; i < arr_roomimage.length; i++) {
      const createRoomimage = await Roomimage.create({
        image: arr_roomimage[i],
        postId: createPost.postId,
      });
    }
    if (!createPost) {
      res
        .status(400)
        .json({ result: false, error: "게시글이 생성되지 않았습니다." });
    }
    res.status(200).json({ result: true });
  };
  updatePost = async (req, res, next) => {
    const { postId } = req.params;

    const {
      placename,
      category,
      charge,
      content,
      images,
      location,
      message,
      keyword,
      roomtitle,
      roomcharge,
      roomimage,
    } = req.body;

    const updatePost = await this.postService.updatePost(
      postId,
      placename,
      category,
      charge,
      content,
      images,
      location,
      message,
      keyword,
      roomtitle,
      roomcharge,
      roomimage
    );
    if (keyword) {
      let arr_word = keyword.toString().split(" ");
      for (let i = 0; i < arr_word.length; i++) {
        const updateKeyword = await Keyword.destroy({
          where: { postId: postId },
        });
      }
      for (let i = 0; i < arr_word.length; i++) {
        const updateKeyword = await Keyword.create({
          keyword: arr_word[i],
          postId: postId,
        });
      }
    }
    if (roomtitle) {
      let arr_roomtitle = roomtitle.toString().split(" ");
      for (let i = 0; i < arr_roomtitle.length; i++) {
        const updateRoomtitle = await Roomtitle.destroy({
          where: { postId: postId },
        });
      }
      for (let i = 0; i < arr_roomtitle.length; i++) {
        const updateRoomtitle = await Roomtitle.create({
          title: arr_roomtitle[i],
          postId: postId,
        });
      }
    }
    if (roomcharge) {
      let arr_roomcharge = roomcharge.toString().split(" ");
      for (let i = 0; i < arr_roomcharge.length; i++) {
        const updateRoomcharge = await Roomcharge.destroy({
          where: { postId: postId },
        });
      }
      for (let i = 0; i < arr_roomcharge.length; i++) {
        const updateRoomcharge = await Roomcharge.create({
          charge: arr_roomcharge[i],
          postId: postId,
        });
      }
    }
    if (roomimage) {
      let arr_roomimage = roomimage.toString().split(" ");
      for (let i = 0; i < arr_roomimage.length; i++) {
        const updateRoomimage = await Roomimage.destroy({
          where: { postId: postId },
        });
      }
      for (let i = 0; i < arr_roomimage.length; i++) {
        const updateRoomimage = await Roomimage.create({
          image: arr_roomimage[i],
          postId: postId,
        });
      }
    }

    res.status(200).json({ result: true });
  };
  getPost = async (req, res, next) => {
    const { postId } = req.params;

    const post = await this.postService.getPost(postId);

    res.status(200).json(post);
  };
  deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.deletePost(postId);
    res.status(200).json({ result: true });
  };
}
module.exports = PostController;
