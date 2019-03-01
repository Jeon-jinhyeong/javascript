var express    = require("express");
var mongoose   = require("mongoose");
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var app = express();

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Routes
app.use("/", require("./routes/home"));
app.use("/auth", require("./routes/auth"));

// Port setting
app.listen(3000, function(){
 console.log("server on!");
});