const express = require('express');
const router = express.Router();

//	middlewares
const protectRoute = require('./../middlewares/protectRoute');
const validateContactTypes = require('./../middlewares/validateContactTypes');

//	services
const { getContactTypes, createContactType, updateContactType } = require('./../services/contactTypes')

// api/contactTypes
//  Same call as categories : V2 : refacto with params


// GET all contact types
router.get('/', protectRoute('volunteer'), async (req, res, next) => {
	try {
		const contactTypes = await getContactTypes();
		res.status(200).json(contactTypes)
	} catch (err) {
		res.status(500).json(err.toString())
	}
});

// POST a new contact types
router.post('/', protectRoute('admin'), validateContactTypes, async (req, res, next) => {
	const { name } = req.body;

	try {
		const newContactType = await createContactType(name);
		res.status(200).json(newContactType)
	} catch (err) {
		res.status(500).json(err.toString())
	}
});

// PATCH archive-reactive a contact
// Front-end you will need to :
// if change isActive : get name data and add it yourself in req.body
// if change name : get isActive data and add it yourself in req.body
router.patch('/:id', protectRoute('admin'), validateContactTypes, async (req, res, next) => {

	const {id} = req.params ;
	try {
		const updatedContactType = await updateContactType(id, req.body);
		res.status(200).json(updatedContactType)
	} catch (err) {
		res.status(500).json(err.toString())
	}

});

module.exports = router;

