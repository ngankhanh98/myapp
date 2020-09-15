const createHttpError = require("http-errors");
// const createHttpError = require("http-errors");
const RecipesModel = require("../models/recipes.model");

module.exports = {
  load: async () => await RecipesModel.find({}),
  detail: async (uri) => {
    try {
      const result = await RecipesModel.find({ uri: uri });
      if (result.length === 0) throw createHttpError("Recipes not found");
      return result;
    } catch (error) {
      throw createHttpError(error);
    }
  },
  add: async (data) => {
    try {
      await RecipesModel.create(data);
    } catch (error) {
      throw createHttpError(error);
    }
  },
  get: (uri) => RecipesModel.find({ uri: uri }),
};
