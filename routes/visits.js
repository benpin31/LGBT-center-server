var express = require("express");
var router = express.Router();
const Visits = require("../model/visits");
const protectRoute = require('./../middlewares/protectRoute');

/* GET the visits listing. */
router.get("/", protectRoute('benevole'), (req, res, next) => {
  Visits.find()
    .populate("category contactType")
    .then((success) => res.status(200).json(success))
    .catch((error) => {
      console.log(error)
      res.status(500).json(error);
    });
});

/* POST create visits. */
router.post("/", protectRoute('benevole'), (req, res, next) => {
  let { category, contactType } = req.body;

  Visits.create({ category, contactType })
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(500).json(error));
});

/* PATCH modify visits. */
router.patch("/:id", protectRoute('benevole'), (req, res, next) => {
  //V2 check if category - contact exists and is current
  Visits.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(500).json(error));

});

/* DELETE visits. */
router.delete("/:id", protectRoute('benevole'), (req, res, next) => {
  Visits.findByIdAndDelete(req.params.id)
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
