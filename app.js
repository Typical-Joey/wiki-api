const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
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

const articleSchema = mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

// Find all articles in database
app.get("/articles", function (req, res) {
    Article.find(function (err, articles) {
        if (!err) {
            res.send(articles);
        } else {
            res.send(err);
        }
    })
});

// Add new articles
app.post("/articles", function (req, res) {
    const title = req.body.title;
    const content = req.body.content;

    const article = new Article({
        title: title,
        content: content
    });

    article.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send("Succesfully added new article!");
        }
    });

});



app.listen(process.env.PORT || 3000, function () {
    console.log("Server is now listening");
});