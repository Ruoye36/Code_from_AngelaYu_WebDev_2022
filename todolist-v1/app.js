//npm installed modules
const express = require("express");
const bodyParser = require("body-parser");
//local modules i wrote
const date = require(__dirname + "/date.js");

const app = express();
let newItems = [];
let workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs"); //set the view engine to EJS.
//A template engine enables you to use static template files in your application.
//At runtime, the template engine replaces variables in a template file with actual values, and
//transforms the template into an HTML file sent to the client.
//This approach makes it easier to design an HTML page.

app.listen(3000, function() {
  console.log("Server started on port 3000");
})

app.get("/", function(req, res) {
  let day = date.getDate();
  console.log(day);
  res.render("list", {
    listTitle: day,
    newListItems: newItems
  });
  //use the view engine set up using set() to render a particular page. Assumes a views directory containing an "list.ejs" page.
  //key "kindOfDay" must match with the <%=kindOfDay%> in "list.ejs"
});

app.post("/", function(req, res) {
  let newItem = req.body.nextTodo;
  console.log(req.body.listAddBtn);
  if (req.body.listAddBtn === 'Work') {
    workItems.push(newItem);
    console.log(workItems);
    res.redirect("/work");
  } else {
    newItems.push(newItem);
    console.log(newItems);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: 'Work',
    newListItems: workItems
  });
});

// app.post("/work", function(req, res) {
//   workItem.push(req.body.newItem);
//   res.redirect("/work");
// });

app.get("/about", function(req, res) {
  res.render("about");
})
