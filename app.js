const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});


app.get("/", function (req, res) {
    res.send("Server is running");
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is now listening");
});