const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const Mern = require('../models/Mern');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const mern = await Mern.find({ user: req.user.id }).sort({ date: -1 });
    res.json(mern);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server eror');
  }
});

router.post(
  '/',
  auth,
  [check('name', 'Name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, deadline, status } = req.body;
    try {
      const newMern = new Mern({
        name,
        deadline,
        status,
        user: req.user.id,
      });
      const mern = await newMern.save();
      res.json(mern);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('server eror');
    }
  }
);

router.put('/:id', auth, async (req, res) => {
  const { name, deadline, status } = req.body;
  const mernFields = {};
  if (name) mernFields.name = name;
  if (deadline) mernFields.deadline = deadline;
  if (status) mernFields.status = status;

  try {
    let mern = await Mern.findById(req.params.id);

    if (!mern) return res.status(404).json({ msg: ' Not found' });
    if (mern.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authourized' });
    }
    mern = await Mern.findByIdAndUpdate(
      req.params.id,
      { $set: mernFields },
      { new: true }
    );
    res.json(mern);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server eror');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let merns = await Mern.findById(req.params.id);

    console.log(merns, 'params');
    if (!merns) return res.status(404).json({ msg: ' Not Found' });
    if (merns.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authoeized' });
    }
    await Mern.findByIdAndRemove(req.params.id);
    res.json({ msg: 'removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server eror');
  }
});

module.exports = router;
