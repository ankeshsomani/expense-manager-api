const db= require("../models");
const { Expenses} = require('../models');
const Op = db.sequelize.Op;

exports.create =(req, res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }
    const expense = {
        expensedate: req.body.expensedate,
        category: req.body.category,
        amount: req.body.amount,
        description: req.body.description,
      };
      Expenses.create(expense)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Expense."
          });
      });
}


exports.findAll = (req, res) => {
    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
  
    db.Expenses.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving expenses."
        });
      });
  
};
exports.findOne = (req, res) => {
  
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};