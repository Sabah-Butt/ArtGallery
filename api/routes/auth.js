const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async(req,res)=>{
    
    try{
        // const username= req.body.username;
        // const email= req.body.email;

        // dbs.query(username || email)
        
        // dbs.query(user || email ) res.error(202)
        // const reqBody = req.body; 
        // const userCH = await User.findOne({username: req.body.username});
        // userCH && res.status(400).json("wrong credentials!");

        // const email = await User.findOne({email: req.body.email});
        // email && res.status(400).json("already existed");

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async(req,res)=>{
    try{

        const user = await User.findOne({username: req.body.username});
        console.log("jhfjhjfh", req.body);


        !user && res.status(400).json("wrong credentials!");
        console.log("$$$$$", user);

        const validated = await bcrypt.compare(req.body.password, user.password);

        !validated && res.status(400).json("wrong credentials!");
        const {password,...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(404).json(err);
    }
});
module.exports = router;