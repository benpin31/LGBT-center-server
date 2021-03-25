const express = require('express');
const router = express.Router();
const ContactTypesModel = require('./../model/contactTypes');
const protectRoute = require('./../middlewares/protectRoute');

// api/contactTypes

// GET all contacts 
router.get('/', protectRoute('benevole'), (req, res, next) => {
  ContactTypesModel.find()
  .then(dbSuccess => res.status(200).json(dbSuccess))
  .catch(err => res.status(500).json(err));
});

// POST a new contact
router.post('/', protectRoute('admin'), (req, res, next) => {
  ContactTypesModel.create(req.body)
  .then(dbSuccess => res.status(200).json(dbSuccess))
  .catch(err => res.status(500).json(err));
});

// PATCH archive-reactive a contact
//Front-end you will need to :
  // if change isActive : get name data and add it yourself in req.body
  // if change name : get isActive data and add it yourself in req.body
router.patch('/:id', protectRoute('admin'), (req, res, next) => {
  ContactTypesModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(dbSuccess => res.status(200).json(dbSuccess))
  .catch(err => res.status(500).json(err));
});

module.exports = router;

