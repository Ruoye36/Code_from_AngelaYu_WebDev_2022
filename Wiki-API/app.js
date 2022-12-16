const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("Article", articleSchema);

// Requests targeting all articles
app.route("/articles")
  .get(function(req, res) {
    Article.find({}, function(err, foundArticles) {
      if (err) {
        res.send(err);
      } else {
        res.send(foundArticles);
      }
    })
  })
  .post(function(req, res) {
    console.log(req.body.title);
    console.log(req.body.content);
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully added a new article.");
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany({}, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted all articles.")
      }
    });
  });

// Requests targeting a specific article
app.route("/articles/:articleTitle")
  .get(function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
      if(!err){
        if(foundArticle){
          res.send(foundArticle);
        }else{
          res.send("No matching article(s).");
        }
      }else{
        res.send(err);
      }
    });
  })
  .put(function(req,res){ //MongooseError: The MongoDB server disallows overwriting documents using `updateOne`.
    Article.findOneAndUpdate(
      {title:req.params.articleTitle},
      {title:req.body.title,content:req.body.content},
      {overwrite:true},
      function(err,results){
        if(!err){
          res.send("Successfully updated article '"+req.params.articleTitle+"'.");
          console.log("Success");
        }else{
          res.send(err);
          console.log(err);
        }
    });
  })
  .patch(function(req,res){
      Article.findOneAndUpdate(
        {title:req.params.articleTitle},
        {$set:req.body}, //so smart!!
        function(err){
          if(!err){
            res.send("Successfully updated '"+req.params.articleTitle+"'.");
          }else{
            res.send(err);
          }
        })
  })
  .delete(function(req,res){
    Article.deleteOne(
      {title:req.params.articleTitle},
      function(err){
        if(!err){
          res.send("Successfully deleted article '"+req.params.articleTitle+"'.");
        }else{
          res.send(err);
        }
      }
    )
  });





app.listen(3000, function() {
  console.log("Server started on port 3000.");
})


/*

*/
