const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send("Welcome to backend server");
});

router.post("/login", (req, res) => {
  
});

module.exports = router;