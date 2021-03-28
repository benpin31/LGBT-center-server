const express = require('express');
const router = express.Router();
const ContactTypesModel = require('./../model/contactTypes');
const protectRoute = require('./../middlewares/protectRoute');

// api/contactTypes

// GET all contacts 
router.get('/', protectRoute('volunteer'), (req, res, next) => {
  ContactTypesModel
  .find()
  .sort({name:1})
  .collation({ locale: 'en_US', caseLevel: true }) // Mongo sort uppercase before lowercase : use to avoid that
  .then(dbSuccess => res.status(200).json(dbSuccess))
  .catch(err => res.status(500).json(err));
});

// POST a new contact
router.post('/', protectRoute('admin'), (req, res, next) => {
  const {name} = req.body;
  if(name.length < 3) {
    res.status(400).json("name too short");
    return
  }

  ContactTypesModel.create(req.body)
  .then(dbSuccess => res.status(200).json(dbSuccess))
  .catch(err => res.status(500).json(err));
});

// PATCH archive-reactive a contact
//Front-end you will need to :
  // if change isActive : get name data and add it yourself in req.body
  // if change name : get isActive data and add it yourself in req.body
router.patch('/:id', protectRoute('admin'), (req, res, next) => {
  const {name} = req.body;
  if(name.length < 3) {
    res.status(400).json("name too short");
    return
  }

  ContactTypesModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(dbSuccess => res.status(200).json(dbSuccess))
  .catch(err => res.status(500).json(err));
});

module.exports = router;

