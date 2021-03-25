const express = require('express');
const router = express.Router();
const CategoriesModel = require('./../model/visitCategories');
const protectRoute = require('./../middlewares/protectRoute');

// api/categories

// GET all categories 
router.get('/', protectRoute('volunteer'), (req, res, next) => {
  CategoriesModel.find()
  .then(dbSuccess => res.status(200).json(dbSuccess))
  .catch(err => res.status(500).json(err));
});

// POST a new categorie
router.post('/', protectRoute('admin'), (req, res, next) => {
  CategoriesModel.create(req.body)
  .then(dbSuccess => res.status(200).json(dbSuccess))
  .catch(err => res.status(500).json(err));
});

// PATCH archive-reactive a category
//Front-end you will need to :
  // if change isActive : get name-description data and add it yourself in req.body
  // if change name-description : get isActive data and add it yourself in req.body
router.patch('/:id', protectRoute('admin'), (req, res, next) => {
  const {name, description} = req.body;
  if(name.length < 3 || description.length < 3) {
    res.status(400).json("name and/or description too short");
    return
  }

  CategoriesModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(dbSuccess => res.status(200).json(dbSuccess))
  .catch(err => res.status(500).json(err));
});

module.exports = router;
