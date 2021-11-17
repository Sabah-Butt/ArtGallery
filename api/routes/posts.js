const router = require("express").Router();

const User = require("../models/User");
const Post = require("../models/Post");

const bcrypt = require("bcrypt");
const { use } = require("bcrypt/promises");


//Create new post
router.post("/create", async(req,res)=>{

    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
    
})

//update new post
router.put("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        console.log("helslkfs"+ post);
        console.log("sfsfs"+ req.body.username);
        const {tit, desc} = req.body;
        if(post.username === req.body.username){
            try{
                console.log("$$$$$$$");
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: {
                            desc,
                            title: req.body.tit,
                        },
                    },
                    {new: true}
                );
                console.log("UPDATED POST", updatedPost);
                res.status(200).json(updatedPost);
            }catch(err){
                res.status(500).json(err);
            }
            }else{
                res.status(401).json("you can update only your pst");
            }
    }catch(err){
        res.status(502).json(err);
    }
    
});
//delete
router.delete("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
       
        if(post.username === req.body.username){
            try{
                await post.delete()
                res.status(200).json("Post has been deleted...");
            }catch(err){
                res.status(500).json(err);
            }
            }else{
                res.status(401).json("you can delete only your pst");
            }
    }catch(err){
        res.status(500).json(err);
    }

    
});

//GET POST
router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err)
    }
});

//GET ALL POSTS
router.get("/", async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    console.log("why");
    try{
        let posts;
        console.log("req body", req.body);
        if(username){
            console.log("hello");
            posts= await Post.find({username})
        }else if(catName){
            posts= await Post.find({categories: {
                $in:[catName]
            }})
        }else{
            posts = await Post.find();
        }
        //posts = [{title: "HEllow world", description: "saba is a stupid btihc!"}];
        res.status(200).json(posts);
    }
    catch(err){
        res.status(502).json(err)
    }
});

router.get("/myposts/:username", async(req,res)=>{
   
    const username2 = req.params.username;

    console.log(username2);
    try{
        console.log("yellow");
       let posts;
        if(username2){
            console.log("hello");
            try{
                posts= await Post.find({username:
                {
                    $in:[username2]
                }})
                // res.status(200).json("Post has been deleted...");
                console.log(posts);
            }catch(err){
                res.status(502).json(err);
            }
            }else{
                console.log("nope");
                res.status(401).json("you have no posts!");
            }
            res.status(200).json(posts);
    }catch(err){
        res.status(502).json(err);
    }
});


module.exports = router;