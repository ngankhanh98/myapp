var express = require("express");
var router = express.Router();
const RecipeModel = require("../models/recipes.model");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/recipes", async (req, res) => {
  const _datas = await RecipeModel.find({});
  console.log("_datas", _datas); 
  console.log("datas", _datas);
  res.render("recipes", { datas: _datas });
});

module.exports = router;
