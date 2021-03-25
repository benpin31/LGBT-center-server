var express = require("express");
var router = express.Router();
const Visits = require("../model/visits");

/* GET the visits listing. */
router.get("/", (req, res, next) => {
  Visits.find(/*{ date: Date.now() }*/)
    .populate("category")
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(500).json(error));
});

/* POST create visits. */
router.post("/", (req, res, next) => {
  let { category, contactType } = req.body;

  Visits.create({ category, contactType })
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(500).json(error));
});

/* PATCH modify visits. */
router.patch("/:visitId", (req, res, next) => {
  if (req.body.category === "" || req.body.contactType === "") {
    res
      .status(400)
      .json({ message: "category or contactType should not be empty" });
  } else if (req.body.date > Date.now()) {
    res
      .status(400)
      .json({ message: "the date shoudn't be superior as today's date" });
  } else {
    Visits.findByIdAndUpdate(req.body)
      .then((success) => res.status(200).json(success))
      .catch((error) => res.status(500).json(error));
  }
});

/* DELETE visits. */
router.delete("/:visitId", (req, res, next) => {
  Visits.findByIdAndDelete(req.params.visitId)
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
