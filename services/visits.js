const Visits = require("../model/visits");

const getVisits = async (dateBegin, dateEnd) => {
	try {
		const visits = await Visits
			.find({
				date: {
					$gte: dateBegin,
					$lte: dateEnd
				}
			})
			.populate("category contactType")

		return visits;
	} catch (err) {
		f
		console.log(err);
	}

}

const createVisit = async (category, contactType) => {
	try {
		const newVisit = await Visits.create({
			category,
			contactType
		})

		return newVisit;
	} catch (err) {
		console.log(err);
	}
}

const updateVisit = async (id, newProperties) => {
	try {
		const updatedVisit = Visits.findByIdAndUpdate(id, newProperties, { new: true })
		return updatedVisit;
	} catch (err) {
		console.log(err);
	}
}

const deleteVisit = async (id) => {
	try {
		const deletedVisit = Visits.findByIdAndDelete(id);
		return deletedVisit;
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	getVisits,
	createVisit,
	updateVisit,
	deleteVisit
};