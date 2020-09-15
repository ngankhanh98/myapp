var express = require("express");
const createHttpError = require("http-errors");
var router = express.Router();
// const RecipeModel = require("../models/recipes.model");
const RecipeController = require("../controllers/recipes.controller");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/recipes", async (req, res) => {
  const _datas = await RecipeController.load();
  console.log("_datas", _datas);
  console.log("datas", _datas);
  res.render("recipes", { datas: _datas });
});

router.get("/recipes/:id", async (req, res, next) => {
  const { id } = req.params;

  // const data = {
  //   nameDish: "A",
  //   date: "b",
  //   serving: 2,
  //   complex: "Easy",
  //   duration: "21",
  //   ingredients: ["a", "b", "c"],
  //   steps: ["a", "b", "c"],
  // };
  try {
    const data = await RecipeController.detail(id);
    console.log("data", data);
    res.render("recipes_detail", { layout: false, data: data });
  } catch (error) {
    console.log("error", error);
    next(createHttpError(error));
  }
});

router.get("/recipes/users/add", async (req, res) => {
  res.render("add_recipe", { layout: false });
});

// localhost:3000/recipes
router.post("/recipes/users/add", async (req, res) => {
  const { nameDish, date } = req.body;

  console.log("nameDish", nameDish);
  console.log("date", date);

  const transferToURI = (nameDish) => {
    console.log("nameDish", nameDish);

    let string = nameDish.toString();
    string = string.toLowerCase();
    string = string.split(" ").join("-");
    console.log("string", string);
    return string;
  };
  const uri = transferToURI(nameDish);


  console.log("uri", uri);

  const data = { nameDish, date, uri: uri };

  try {
    await RecipeController.add(data);

    const list = await RecipeController.load();
    console.log("list", list);

    res.status(200).json({ success: true });
  } catch (error) {
    console.log('object', error)
    res.status(400).json(error);
  }
});

module.exports = router;
