const { Post, Review } = require("../models");
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
    const post = await Post.findOne({
      where: { postId },
      include: [{ model: Review }],
    });

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
      userId: post.userId,
      placename: post.placename,
      email: post.email,
      category: post.category,
      charge: post.charge,
      content: post.content,
      images: post.images,
      location: post.location,
      message: post.message,
      keyword: arr_keyword,
      roomtitle: arr_title,
      roomcharge: arr_charge,
      roomimage: arr_image,
      review: post.Reviews,
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
    location
  ) => {
    const post = await Post.update(
      { placename, category, charge, content, images, location },
      { where: { postId } }
    );

    return post;
  };

  searchPost = async (arr_keyword) => {
    let post;
    let array1 = [];
    let array2 = [];
    let array3 = [];
    let array4 = [];

    ///////////////////////////////////////////////////////////////////////////

    //arr_keyword = [조식제공 야외수영장]
    for (let i = 0; i < arr_keyword.length; i++) {
      // 2번 반복하는데 findAll했을 때 1개 밖에 안나와서 인덱스 오류
      post = await Keyword.findAll({
        where: { keyword: arr_keyword[i] },
      });

      array1.push(post);
    }

    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array1[i].length; j++) {
        if (i == 0) {
          array2.push(array1[i][j].postId);
        } else if (i == 1) {
          array3.push(array1[i][j].postId);
        }
      }
    }
    if (!array3.length) {
      return array2;
    }

    for (let i = 0; i < array2.length; i++) {
      if (array3.includes(array2[i])) {
        array4.push(array2[i]);
      }
    }
    return array4;
  };
}
module.exports = postRepository;
