var express = require("express");
var router = express.Router();

// middlewares
const protectRoute = require('./../middlewares/protectRoute');

// services layers
const { getVisits } = require('../services/visits')


/* return the number of visit per category inside a given date range (in req.body). */
router.get("/get-category-repartition", protectRoute('volunteer'), async (req, res, next) => {

	const { query } = req;

	const dateBegin = new Date(query.dateBegin);
	const dateEnd = new Date(query.dateEnd);

	try {
		const visits = await getVisits(dateBegin, dateEnd);

		const categories = [...new Set(visits.map(visit => visit.category.name))];
		const agregatedData = [];
		for (let k = 0; k < categories.length; k++) {
			agregatedData.push({ name: categories[k], value: visits.filter(visit => visit.category.name === categories[k]).length })
		}

		res.status(200).json(agregatedData);

	} catch (err) {
		res.status(500).json(err);
	}

});


/*  Get the average number of visit per day given a date range. Because of the insight, it seems(?) natural to work on complete 
	 weeks, so we begin by rounding the date givent by the user*/
router.get("/get-popular-days", protectRoute('volunteer'), async (req, res, next) => {

	const { query } = req;

	const dateBegin = new Date(query.dateBegin);
	const dateEnd = new Date(query.dateEnd);

	//  Get dates and ​round them
	const dayBegin = dateBegin.getDay();
	const dayEnd = dateEnd.getDay();

	const weekBegin = new Date(dateBegin - (dayBegin + (dayBegin == 0 ? 6 : -1)) * 24 * 3600 * 1000);
	const weekEnd = new Date(dateEnd.getTime() + (7 - dayEnd + (dayEnd === 0 ? -7 : 0)) * 24 * 3600 * 1000);

	//  get raw data (visits in the date range)
	try {
		const visits = await getVisits(dateBegin, dateEnd);

		//  aggregate the data : the result is an object of the type {"1": value, "2": value, ... } where the numbers ("1", "2",...) 
		//  is the day of the week and "value" the number of visits
		const agregatedDataTemp = {};
		let day;
		let nbWeek = (weekEnd - weekBegin) / (1000 * 60 * 60 * 24 * 7);
		//  weekEnd - weekBegin in millisecond

		visits.forEach(visit => {
			day = visit.date.getDay();
			if (agregatedDataTemp[day]) {
				agregatedDataTemp[day] = agregatedDataTemp[day] + 1 / nbWeek;
			} else {
				agregatedDataTemp[day] = 1 / nbWeek;
			}
		})

		//  transform the aggregated data in the rechart (datavis library) format : [{name: "lundi", value: value}, {name: "mardi", value: value}]
		const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
		const agregatedData = [];
		for (let segment in agregatedDataTemp) {
			agregatedData.push({ name: dayNames[segment], value: Math.round(agregatedDataTemp[segment]) })
		}


		res.status(200).json({ agregatedData: agregatedData.filter(data => data.value !== 0), updatedDates: [weekBegin, weekEnd] });

	} catch (err) {
		res.status(500).json(err);
	}

});



/*  Get the average number of visit per hours given a date range. */
router.get("/get-popular-hours", protectRoute('volunteer'), async (req, res, next) => {

	const { query } = req;

	const dateBegin = new Date(query.dateBegin);
	const dateEnd = new Date(query.dateEnd);

	try {
		//  get raw data (visits in the date range)
		let visits = await getVisits(dateBegin, dateEnd);
		const weekDays = query.weekDays.split(",");

		console.log(visits)

		//  Filter by days selected by the user
		if (weekDays) {
			const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
			weekDayNumbers = weekDays.map(weekDay => dayNames.indexOf(weekDay))
			visits = visits.filter(visit => weekDayNumbers.includes(visit.date.getDay()));
		}

		//  aggregate the data : the result od an object of the type {"1": value, "2": value } where "1", "2" is the day of the hour
		//  and value the number of visits
		const agregatedDataTemp = {};
		let hour;
		let nbDays = [...new Set(visits.map(visit => visit.date.getDate()))].length;
		//  get number of day for the division in the average value. Be carrefull, with this method, if one day, nobody comes, 
		//  the day will not be take into account. However, the methide which consists in doing dateEnd-dateBegin is not correct
		//  because the LGBTQI+ center is closed on sunday, and it is unlikely nobody comes one day

		visits.forEach(visit => {
			hour = visit.date.getHours();
			if (agregatedDataTemp[hour]) {
				agregatedDataTemp[hour] = agregatedDataTemp[hour] + 1 / nbDays;
			} else {
				agregatedDataTemp[hour] = 1 / nbDays;
			}
		})

		// transforme in the good rechart format
		const agregatedData = [];
		for (let segment in agregatedDataTemp) {
			agregatedData.push({ name: `${segment}h-${Number(segment) + 1}h`, value: Math.round(agregatedDataTemp[segment]) })
		}

		console.log(agregatedData.filter(data => data.value !== 0))
		res.status(200).json(agregatedData.filter(data => data.value !== 0));

	} catch (err) {
		res.status(500).json(err);
	}

});

module.exports = router;
