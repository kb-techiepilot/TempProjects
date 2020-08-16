const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./psql/db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const initializePassport = require("./passportConfig");

initializePassport(passport);

// const GoogleStrategy = require("passport-google-oauth20").Strategy;

const PORT = process.env.PORT || 2000

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: "This is my secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', indexRouter);
app.use('/', usersRouter);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}!!!`);
});