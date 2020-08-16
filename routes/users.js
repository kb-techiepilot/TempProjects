const express = require('express');
const router = express.Router();

const passport = require("passport");

router.get("/users/register", checkAuthenticated, (req, res) => {
    res.render("register");
});

router.get("/users/login", checkAuthenticated, (req, res)=>{
    res.render("login");
});

router.get("/users/dashboard", checkNotAuthenticated, (req, res)=>{
    res.render("dashboard", {   user: req.user.name  });
})

router.get("/users/logout", (req, res) => {
    req.logOut();
    res.redirect("/users/login");
})

router.post("/users/register", async (req, res)=>{
    const { name, email, password, password2 } = req.body;

    const errors = [];
    if( !name || !email || !password || !password2) {
        errors.push( { message: "Please enter all fields!" });
    }

    else if(password != password2) {
        errors.push({ message: "Passwords do not match!" });
    }

    if(errors.length > 0 ) {
        res.status(400).json({ "message": {errors} } );
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        pool.query(
            `SELECT * FROM users
              WHERE email = $1`,
            [email],
            (err, results) => {
              if (err) {
                throw err;
              }

              if(results.rows.length > 0) {
                  errors.push( { message: "Email already registered" });
                  res.status(400).json({ "message": {errors} } );
              } else {
                  pool.query(
                      `INSERT INTO users (name, email, password) 
                      VALUES ($1, $2, $3)
                      RETURNING id, password`,
                      [name, email, hashedPassword],
                      (err, result) => {
                          if(err){
                              throw err;
                          }
                          req.flash('success_msg', "You are now registerd. please login");
                          res.status(200).json({ 
                              "message": "You are now registerd. please login",
                              "success": true
                             } );
                      }
                  );
              }
            }
        );
    }
});

router.post("/users/login", passport.authenticate('local', {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
})
);

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect("/users/dashboard");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/users/login");
}

module.exports = router;