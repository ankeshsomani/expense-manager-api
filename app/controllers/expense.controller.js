const db = require("../models");
const { Expenses, Sequelize } = require("../models");
const Op = db.sequelize.Op;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Expense.",
      });
    });
};

exports.findAll = (req, res) => {
  const description = req.query.description;
  const fromDate = req.query.fromDate;
  const toDate = req.query.toDate;
  const category = req.query.category;
  var search = {};
  if (description) {
    search = {
      [Sequelize.Op.or]: [
        { description: { [Sequelize.Op.like]: `%${description}%` } },
      ],
    };
  }
  if (fromDate && toDate) {
    search.expensedate = { [Sequelize.Op.between]: [fromDate, toDate] };
  }
  else if (fromDate) {
    search.expensedate = { [Sequelize.Op.gt]: `${fromDate}` };
  }
  else if (toDate){
    search.expensedate = { [Sequelize.Op.lt]: `${toDate}` };
  }

  if (category) {
    search.category = { [Sequelize.Op.eq]: `${category}` };
  }
  console.log("query formed  is :--" + search);

  db.Expenses.findAll({ where: { [Sequelize.Op.and]: [search] } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses.",
      });
    });
};

exports.findOne = (req, res) => {};

exports.update = async (req, res) => {
  console.log("id to be updated is :--" + req.params.id);
  console.log(JSON.stringify(req.body));
  const primarykey = req.params.id;

  db.Expenses.update(req.body, {
    where: { id: primarykey },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Expense was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Expense with id=${id}. Maybe Expense was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Expense with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  db.Expenses.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Expense was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Expense with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {};
