module.exports = app => {
    const expenses = require("../controllers/expense.controller.js");
  
    var router = require("express").Router();

    router.post("/", expenses.create);
  
    router.get("/", expenses.findAll);
  
    router.get("/:id", expenses.findOne);
  
    router.put("/:id", expenses.update);
  
    router.delete("/:id", expenses.delete);
  
    router.delete("/", expenses.deleteAll);
  
    app.use('/api/expenses', router);
  };