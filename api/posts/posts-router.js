// implement your posts router here
const router = require('express').Router();
const Posts = require('./posts-model');

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find()
    res.json(posts)
  }
  catch (err) {
    res.status(500).json({ message: 'The posts information could not be retrieved' })
  }
});

router.get('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (!post) {
      res.status(404).json({ message: 'The post with the specified ID does not exist' })
    } else {
      res.json(post)
    }
  }
  catch (err) {
    res.status(500).json({ message: 'The post information could not be retrieved' })
  }
})

router.post('/', async (req,res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({ message: 'Please provide title and contents for the post' })
    }
    else {
      const { id } = await Posts.insert(req.body);
      const newPost = await Posts.findById(id);
      res.status(201).json(newPost)
    }
  }
  catch (err) {
    res.status(500).json({ message: 'There was an error while saving the post to the database' })
  }
})

router.put('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({ message: 'Please provide title and contents for the post'})
    }
    else {
      const updatingPost = await Posts.findById(id);
      if (!updatingPost) {
        res.status(404).json({ message: 'The post with the specified ID does not exist' })
      } else {
        await Posts.update(id, req.body);
        const updatedPost = await Posts.findById(id);
        res.json(updatedPost)
      }
    }
  }
  catch (err) {
    res.status(500).json({ message: 'The post information could not be modified' })
  }
})

router.delete('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const deletingPost = await Posts.findById(id);
    if (!deletingPost) {
      res.status(404).json({ message: 'The post with the specified ID does not exist' })
    }
    else {
      await Posts.remove(id)
      res.status(200).json(deletingPost)
    }
  }
  catch (err) {
    res.status(500).json({ message: 'The post could not be removed' })
  }
})

router.get('/:id/comments', async (req,res) => {
  try {
    const { id } = req.params;
    const commentPost = await Posts.findById(id);
    if (!commentPost) {
      res.status(404).json({ message: 'The post with the specified ID does not exist'})
    }
    else {
      const comments = await Posts.findPostComments(id);
      res.json(comments);
    }
  }
  catch {
    res.status(500).json({ message: 'The comments information could not be retrieved' })
  }
})

module.exports = router;
