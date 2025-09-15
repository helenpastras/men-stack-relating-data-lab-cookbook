const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get ('/', async (req,res) => {
    try {
        const allUsers = await User.find();
        res.render('users/index.ejs', {allUsers});
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:userId', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);
    if (!selectedUser) throw new Error('User not found');

    res.render('users/show.ejs', { selectedUser });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;