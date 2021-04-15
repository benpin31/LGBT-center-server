const express = require('express');
const router = express.Router();
const CategoriesModel = require('./../model/visitCategories');

// middlewares
const protectRoute = require('./../middlewares/protectRoute');
const validateCategories = require('./../middlewares/validateCategories');

// services
const { getCategories, createCategory, updateCategory } = require('./../services/categories')

// api/categories

// GET all categories 
router.get('/', protectRoute('volunteer'), async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err.toString())
  }
});

// POST a new categorie
router.post('/', protectRoute('admin'), validateCategories, async (req, res, next) => {
  try {
    const newCategory = await createCategory(req.body);
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(500).json(err.toString())
  }
});

// PATCH archive-reactive a category
// Front-end you will need to :
// if change isActive : get name-description data and add it yourself in req.body
// if change name-description : get isActive data and add it yourself in req.body
router.patch('/:id', protectRoute('admin'), validateCategories, async (req, res, next) => {
  try {
    const updatedCategory = await updateCategory(req.params.id, req.body) ;
    res.status(200).json(updatedCategory)
  } catch(err) {
    res.status(500).json(err.toString())
  }
});

module.exports = router;
