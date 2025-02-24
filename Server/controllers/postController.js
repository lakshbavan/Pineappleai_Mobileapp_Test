const postModel = require("../models/postModel");
const {getDataUri} = require('../features')

// create post
const createPostController = async (req, res) => {
  try {
    const { name, address, phone , module } = req.body;
    //validate
    if (!name || !address || !phone || !module ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const post = await postModel({
      name, 
      address, 
      phone , 
      module,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Create Post APi",
      error,
    });
  }
  };

  // GET ALL POSTS
  const getAllPostsController = async (req,res) => {
    try {
      const posts = await postModel.find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        message: "All Students Data",
        posts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In GETALLPOSTS API",
        error,
      });
    }
  };


  // get user posts
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User POST API",
      error,
    });
  }
};


// delete post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post been deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete post api",
      error,
    });
  }
};

//UPDATE POST
const updatePostController = async (req, res) => {
  try {
    const {  name, address, phone , module } = req.body;
    //post find
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if (!name || !address || !phone || !module ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide post title or description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: name || post?.name,
        address: address || post?.address,
        phone: phone || post?.phone,
        module: module || post?.module,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post Updated Successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in update post api",
      error,
    });
  }
};

  

module.exports = {createPostController, getAllPostsController, getUserPostsController, deletePostController, updatePostController};