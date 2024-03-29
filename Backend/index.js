//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");
// app.use(express.static(__dirname + "/public"));

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var Users = [
  {
    username: "admin",
    password: "admin",
  },
];

var books = [
  { BookID: "1", Title: "Book 1", Author: "Author 1" },
  { BookID: "2", Title: "Book 2", Author: "Author 2" },
  { BookID: "3", Title: "Book 3", Author: "Author 3" },
];

//Route to handle Post Request Call
app.post(
  "/login",
  function (req, res) {
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    // var username = req.body.username;
    // var password = req.body.password;
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ", req.body);
    Users.filter(function (user) {
      if (
        user.username === req.body.username &&
        user.password === req.body.password
      ) {
        res.cookie("cookie", "admin", {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        req.session.user = user;
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        
        res.end("successful");
      } else {
        console.log("HEllo 1111");

        
        res.end("Fail");
      }
    });
  },
);

// app.get("/create", function (req, res) {
//     if (!req.session.user) {
//       res.redirect("/");
//     } else {
//       res.render("create");
//     }
//   });

app.post("/create", function (req, res) {
  // add your code
  console.log(req.body);

  let item = req.body;
  console.log(req.body);
  let res1 = books.map((items) => items.BookID);

  console.log(res1);

  if (res1.includes(item.bID)) {
    res.end('s')
  } else {
    books.push({ BookID: item.bID, Title: item.bName, Author: item.aName });
   
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    
    res.end("successful");
    // res.redirect("http://localhost:3000/home");
  }
  console.log(books);
});


app.post("/delete", function (req, res) {
  // add your code here
  did = req.body.dID;

  let res1 = books.map((items) => items.BookID);

  if (res1.includes(did)) {
    var index = books.findIndex((p) => p.BookID == did);
    console.log(index);
    books.splice(index, 1);
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("successful");
    // res.redirect("http://localhost:3000/home");
    // req.session.book = book;
  } else {
    res.send("s");
  }
});

//Route to get All Books when user visits the Home Page
app.get("/home", function (req, res) {
  console.log("Inside Home Login");
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  console.log("Books : ", JSON.stringify(books));
  res.end(JSON.stringify(books));
});
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
