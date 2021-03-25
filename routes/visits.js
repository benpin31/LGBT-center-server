var express = require("express");
var router = express.Router();
const Visits = require("../model/visits");
const protectRoute = require('./../middlewares/protectRoute');

/* GET the visits listing. */
router.get("/", protectRoute('volunteer'), (req, res, next) => {
  // console.log(Date.now().toISOString().substring(0,9))
  const today=new Date()
  const dateBegin = today.toISOString().substring(0,10) + " 00:00:00"
  const dateEnd = today.toISOString().substring(0,10) + " 23:59:59"
  Visits
    .find({
      date: {
        $gte: dateBegin, 
        $lt: dateEnd
      }
    })
    .sort({date: -1})
    .populate("category contactType")
    .then((success) => res.status(200).json(success))
    .catch((error) => {
      console.log(error)
      res.status(500).json(error);
    });
});

/* POST create visits. */
router.post("/", protectRoute('volunteer'), (req, res, next) => {
  let { category, contactType } = req.body;

  Visits.create({ category, contactType })
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(500).json(error));
});

/* PATCH modify visits. */
router.patch("/:id", protectRoute('volunteer'), (req, res, next) => {
  //V2 check if category - contact exists and is current
  Visits.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(500).json(error));

});

/* DELETE visits. */
router.delete("/:id", protectRoute('volunteer'), (req, res, next) => {
  Visits.findByIdAndDelete(req.params.id)
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
