const ContactTypesModel = require('./../model/contactTypes');

const getContactTypes = async () => {
	try {
		const contactTypes = await ContactTypesModel
			.find()
			.sort({ name: 1 })
			.collation({ locale: 'en_US', caseLevel: true }) // Mongo sort uppercase before lowercase : use to avoid that
		return contactTypes;
	} catch (err) {
		console.log(err);
		throw new Error(err)
	}
}

const createContactType = async name => {
	try {
		const newContactType = await ContactTypesModel.create({ name, isActive: true })
		return newContactType;
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
}

const updateContactType = async (id, updatedValues) => {
	try {
		const updatedContactType = ContactTypesModel.findByIdAndUpdate(id, updatedValues, { new: true }) ;
		return updatedContactType ;
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
}

module.exports = { getContactTypes, createContactType, updateContactType };