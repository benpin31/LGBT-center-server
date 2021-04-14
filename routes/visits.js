var express = require("express");
var router = express.Router();
const Visits = require("../model/visits");
const protectRoute = require('./../middlewares/protectRoute');

const { getVisits, createVisit, updateVisit, deleteVisit } = require('../services/visits')

/* GET the visits listing of the current day. */
router.get("/", protectRoute('volunteer'), async (req, res, next) => {
	const { query } = req;

	const today = new Date()
	query.dateBegin = query.dateBegin ? query.dateBegin : today.toISOString();
	query.dateEnd = query.dateEnd ? query.dateEnd : today.toISOString();

	const dateBegin = query.dateBegin.substring(0, 10) + " 00:00:00"
	const dateEnd = query.dateEnd.substring(0, 10) + " 23:59:59"

	try {
		const visits = await getVisits(dateBegin, dateEnd);
		res.status(200).json(visits);
	} catch (err) {
		res.status(500).json(err);
	}

});

/* POST create visits. */
router.post("/", protectRoute('volunteer'), async (req, res, next) => {
	let { category, contactType } = req.body;

	try {
		const newVisit = await createVisit(category, contactType);
		res.status(200).json(newVisit)
	} catch (err) {
		res.status(500).json(err)
	}

});

/* PATCH modify visits. */
router.patch("/:id", protectRoute('volunteer'), async (req, res, next) => {
	//V2 check if category - contact exists and is current

	const { id } = req.params;
	const { body: newProperties } = req;

	try {
		const updatedVisit = await updateVisit(id, newProperties);
		console.log(updatedVisit)
		res.status(200).json(updatedVisit);
	} catch (err) {
		res.status(500).json(err)
	}

});

/* DELETE visits. */
router.delete("/:id", protectRoute('volunteer'), async (req, res, next) => {

	const { id } = req.params;

	try {
		const deletedVisit = await deleteVisit(id);
		res.status(200).json(deletedVisit);
	} catch (err) {
		res.status(500).json(err);
	}

});

module.exports = router;