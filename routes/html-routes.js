// Dependencies
var path = require("path");

// Routes
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.
  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addressBook.html"));
  });

  app.get("/addPerson", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addPerson.html"));
  });

  // addressBook route loads addressBook.html
  app.get("/addressBook", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addressBook.html"));
  });
};