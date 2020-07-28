const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//ROUTES

//Gets back all the posts
router.get('/', async(req, res) => {
   try{
    const post = await Post.find();
    res.json(post);
   }catch(err) {
       res.json({
           message: err
       });
   }
});

//submit a post
router.post('/', async(req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err) {
        res.json({message: err});
    }
});

//specific post
router.get('/:postId', async(req, res) => {
   try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
   }catch(err) {
       res.json({
           message: err
       });
   }
})

//delete a specific post without async and await
router.delete('/:postId', (req, res) => {
    Post.remove({_id : req.params.postId})
    .then(response => {
        res.json(response);
    })
    .catch((err) => {
        res.json({
            message: err
        })
    });
})

//update a post
router.patch('/:postId', async(req, res) =>{
   try{
       const updatedPost = await Post.updateOne({_id: req.params.postId},{$set: {title:req.body.title}});
   res.json(updatedPost);
   }catch(err){
    res.json({
        message: err
    })
   }
});


module.exports = router;