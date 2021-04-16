const validateCategories = (req, res, next) => {
	const {name, description} = req.body;

	if(name.length < 3 || description.length < 3) {
		return res.status(400).json("name and/or description too short");	
	 }
	next()
}

module.exports = validateCategories ;