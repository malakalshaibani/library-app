import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";
import dotenv from 'dotenv';

    

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const con = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@booklibrary.nkt88.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=booklibrary`;


mongoose.connect(con);

app.listen(process.env.PORT,()=>{
    console.log("You are Connected with Server") 
});

app.post("/registerUser", async(req, res)=>{
    try {
    const user = new UserModel({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password ,
        confirmPassword : req.body.confirmPassword
    })
    await user.save();
    res.send({user: user, msg: "User data saved Successfully"})
}
    catch  (error) {
        res.status(500).json({error:"Unexpected error is occurred"})
 }
})


app.post("/login", async (req, res) => { 
    try { 
      const { email, password } = req.body;
    
      const user = await UserModel.findOne({ email: email });
  
      if (!user) { 
        res.status(500).send({ msg: " Couldn't find the user" });
        
      }
      else if (user.password !== password) {
        res.status(500).json({ msg: "Password is incorrect" });
        
      }
      else {
        res.send({user: user,msg:"Authentication is  successfull"})
      }
    }
    catch (error) { 
      res.status(500).json({error:"An unexpected error occurred"})
    }
  })

//POST API - savePost
app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;

    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });

    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET API - getPost
app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    const countPost = await PostModel.countDocuments({});

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});


//PUT API - likePost
app.put("/likePost/:postId/", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
    try {
    //search the postId if it exists
    const postToUpdate = await PostModel.findOne({ _id: postId });
    if (!postToUpdate) {
      return res.status(404).json({ msg: "Post not found." });
    }
    //Search the user Id from the array of users who liked the post.
    const userIndex = postToUpdate.likes.users.indexOf(userId);
    //indexOf method returns the index of the first occurrence of a specified value in an array.
    //If the value is not found, it returns -1.
    //This code will toogle from like to unlike
    if (userIndex !== -1) {
      // User has already liked the post, so unlike it
      const udpatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": -1 }, // Decrement the like count $inc and $pull are update operators
          $pull: { "likes.users": userId }, // Remove userId from the users array
        },
        { new: true } // Return the modified document
      );
  
      res.json({ post: udpatedPost, msg: "Post unliked." });
    } else {
      // User hasn't liked the post, so like it
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": 1 }, // Increment the like count
          $addToSet: { "likes.users": userId }, // Add userId to the users array if not already present
        },
        { new: true } // Return the modified document
      );
  
      res.json({ post: updatedPost, msg: "Post liked." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
  });
  
  app.delete("/deletePost/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
      // Check if the post exists
      const post = await PostModel.findById(postId);
      if (!post) {
        return res.status(404).json({ msg: "Post not found." });
      }
  
      // Delete the post
      await PostModel.deleteOne({ _id: postId });
      res.json({ msg: "Post deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while deleting the post." });
    }
  });

  app.put("/updatePost/:postId", async (req, res) => {
    try {
      const postId = req.params.postId;
      const { postMsg } = req.body; // Updated post message
  
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { postMsg },
        { new: true } // Return the updated document
      );
  
      if (!updatedPost) {
        return res.status(404).json({ msg: "Post not found." });
      }
  
      res.json({ post: updatedPost, msg: "Post updated successfully." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the post." });
    }
  });

  