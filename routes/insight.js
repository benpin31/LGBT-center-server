var express = require("express");
var router = express.Router();

// middlewares
const { protectAuth } = require('./../middlewares/protectRoute');

// services layers
const { getVisits } = require('../services/visits')
const { getCategoriesRepartition, getPopularDays, getPopularHours } = require('./../services/insights')


/* return the number of visit per category inside a given date range (in req.body). */
router.get("/get-category-repartition", protectAuth('volunteer'), async (req, res, next) => {

	const { query } = req;

	const dateBegin = new Date(query.dateBegin);
	const dateEnd = new Date(query.dateEnd);

	try {
		const agregatedData = await getCategoriesRepartition(dateBegin, dateEnd);
		res.status(200).json(agregatedData);
	} catch (err) {
		res.status(500).json(err);
	}

});


/*  Get the average number of visit per day given a date range. Because of the insight, it seems(?) natural to work on complete 
	 weeks, so we begin by rounding the date givent by the user*/
router.get("/get-popular-days", protectAuth('volunteer'), async (req, res, next) => {

	const { query } = req;

	const dateBegin = new Date(query.dateBegin);
	const dateEnd = new Date(query.dateEnd);

	//  get raw data (visits in the date range)
	try {
		const { agregatedData, updatedDates} = await getPopularDays(dateBegin, dateEnd);
		res.status(200).json({ agregatedData, updatedDates });

	} catch (err) {
		res.status(500).json(err);
	}

});



/*  Get the average number of visit per hours given a date range. */
router.get("/get-popular-hours", protectAuth('volunteer'), async (req, res, next) => {

	const { query } = req;

	const dateBegin = new Date(query.dateBegin);
	const dateEnd = new Date(query.dateEnd);

	const weekDays = query.weekDays ;

	try {
		const agregatedData = await getPopularHours(dateBegin, dateEnd, weekDays);
		res.status(200).json(agregatedData);

	} catch (err) {
		res.status(500).json(err);
	}

});

module.exports = router;
