const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            user: currentUser
            // foods: currentUser.pantry
        });
    } catch (error) {
        console.log (error)
        res.redirect('/')
    }
});

router.get('/new', (req,res) => {
    res.render('foods/new.ejs');
})

router.get('/:itemId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foodItem = currentUser.pantry.id(req.params.itemId);

    res.render('foods/edit.ejs', { user: currentUser, foodItem });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/', async (req,res) => {
  try {
      const currentUser = await User.findById(req.session.user._id);
        console.log(req.body);
        currentUser.pantry.push(req.body);
    // Save changes to the user
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.put('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foodItem = currentUser.pantry.id(req.params.itemId);

    if (!foodItem) throw new Error('Food item not found');

    foodItem.set(req.body); // apply updates from form
    await currentUser.save(); // persist changes

    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    await currentUser.pantry.id(req.params.itemId).deleteOne();
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;