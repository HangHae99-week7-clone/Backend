const PostService = require("../services/posts.service");

class PostController {
  postService = new PostService();
  searchPost = async (req, res, next) => {
    const { location } = req.query;

    const searchPost = await this.postService.searchPost(location);
    res.status(200).json(searchPost);
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
      nickname,
    } = req.body;

    const createPost = await this.postService.createPost(
      placename,
      category,
      content,
      charge,
      location,
      images,
      nickname
    );
    if (!createPost) {
      res
        .status(400)
        .json({ result: false, error: "게시글이 생성되지 않았습니다." });
    }
    res.status(200).json({ result: true });
  };
  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { placename, category, charge, content, images, location, keyword } =
      req.body;
    const updatePost = await this.postService.updatePost(
      postId,
      placename,
      category,
      charge,
      content,
      images,
      location
    );
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
