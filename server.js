require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.json({message: "Welcome to expense manager app"});
});
require("./app/routes/expenses.routes")(app);

const PORT = process.env.PORT || 8082;
app.listen(PORT, ()=> {
    console.log("Server is listening at port 8082 for expense manager resquests");
})