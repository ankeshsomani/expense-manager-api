module.exports = (sequelize, Sequelize) => {
    const Expenses = sequelize.define("expenses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
      expensedate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        get(value) {
            return parseFloat(this.getDataValue(value)).toFixed(2)
        }
      },
      description: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      }
    },
      {
        tableName: 'expenses',
        timestamps: false
    });
  
    return Expenses;
  };