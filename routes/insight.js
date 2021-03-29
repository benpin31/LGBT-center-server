var express = require("express");
var router = express.Router();
const Visits = require("../model/visits");
const protectRoute = require('./../middlewares/protectRoute');

/* GET the visits listing. */
router.post("/get-category-repartition", async (req, res, next) => {

  try {
    const visits = await Visits
    .find({
      date: {
        $gte: req.body[0], 
        $lt: req.body[1]
      }
    })
    .populate("category contactType")

    const cats = [...new Set(visits.map(visit => visit.category.name))] ;
    const agregatedData = [] ;
    for (let k=0 ; k < cats.length ; k++) {
      agregatedData.push({name: cats[k], value: visits.filter(visit => visit.category.name === cats[k]).length})
    }

    res.status(200).json(agregatedData) ;

    } catch(err) {
      res.status(500).json(err);
    }

});

module.exports = router ;
