const express    = require('express');
const router     = express.Router();
const request    = require('request');
const cp         = require("copy-paste").global();
const newlineURL = 'https://newline.theironyard.com/api';

router.get("/", function(req, res) {
  if (req.session.token) {
    res.redirect("/supplementals");
  } else {
    res.render("login");
  }
});

router.get("/supplementals", function(req, res) {
  let options = {
    method: "GET",
    uri: newlineURL + "/supplementals",
    auth: {
      'bearer': req.session.token
    },
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  if (req.session.token) {
    request(options,
      function (error, response, body) {
        if (!error) {
          res.render("index", {supplers: JSON.parse(body).data, copied: req.session.copied, title: req.session.title});
        }
      });
  } else {
    res.redirect("/");
  }
});
router.get("/supplementals/:id", function(req, res){
  let options = {
    method: "GET",
    uri: newlineURL + "/supplementals" + "/" + req.params.id,
    auth: {
      'bearer': req.session.token
    },
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  if (req.session.token) {
    request(options,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          cp.copy(JSON.parse(body).body, function() {
            req.session.copied = true;
            req.session.title = JSON.parse(body).title;
            res.redirect("/supplementals");
          });
        } else {
          req.session.title = "There was an error. Please try again.";
          res.redirect("/supplementals");
        }
      });
  } else {
    res.redirect("/supplementals");
  }
});
router.post("/", function(req, res) {
  let form = {
    email: req.body.email,
    password: req.body.password
  };

  let options = {
    method: "POST",
    uri: newlineURL + "/auth",
    form: form,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  request(options,
    function (error, response, body) {
      if (!error && response.statusCode !== 401) {
        req.session.token = JSON.parse(body).jwt;

        res.setHeader('Content-Type', 'application/json');

        res.redirect("/");
      } else {
        res.render("login", {error: "You entered an incorrect username and password combination. Please try again."});
      }
    });
});

router.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
