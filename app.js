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


// All functionality for /articles route
app.route("/articles")
    // Find all articles in database
    .get(function (req, res) {
        Article.find(function (err, articles) {
            if (!err) {
                res.send(articles);
            } else {
                res.send(err);
            }
        })
    })
    // Add new articles
    .post(function (req, res) {
        const title = req.body.title;
        const content = req.body.content;

        console.log(title);
        console.log(content);

        const article = new Article({
            title: title,
            content: content
        });

        article.save(function (err) {
            if (!err) {
                res.send("Succesfully added new article!");
            } else {
                res.send(err);
            }
        });

    })
    // Delete all articles
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Succesfully deleted all articles!");
            } else {
                res.send(err);
            }
        });
    });


// Handle Specific article routes
app.route("/articles/:articleTitle")
    // Load specific article
    .get(function (req, res) {
        Article.findOne({
            title: req.params.articleTitle
        }, function (err, article) {
            if (!err) {
                if (article) {
                    res.send(article);
                } else {
                    res.send("No article with that title found.");
                }
            } else {
                res.send(err);
            }
        });
    });



app.listen(process.env.PORT || 3000, function () {
    console.log("Server is now listening");
});