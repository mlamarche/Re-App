// server.js
// do server stuff
//

var app = require("ferb")(),
    express = require("express");


var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

var session = require('express-session');
var Parse = require('parse').Parse;

app.use(session({
    secret: 'keyboard cat'
}));

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


passport.serializeUser(function(user, done) {
    console.log("Serializing", user)
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log("De-serializing", user)
    done(null, user);
});

passport.use(new FacebookStrategy({
        clientID: "570622113030196",
        clientSecret: "1df07aa26984d8b194de2e59515d3327",
        callbackURL: "http://reapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("Got auth", accessToken, refreshToken, profile);
        console.log(profile.id);
        console.log("welcome ", profile.name.givenName)
        done(null, profile);
    }
));

Parse.initialize("naN50758keB99xyf9lrf1r5LjyuIGiPVwDfu3Y6w", "E4OZ0O3gioOueyIlyjD1MMFVq189RZD29AQazYc8");

var Item = Parse.Object.extend("Item");
var User = Parse.Object.extend("user");

app.get("/", function(req, res) {
    res.sendfile("intro.html");
});

app.get("/authed", function(req, res) {
    //res.send(req.user.displayName + ", Welcome!");
    //console.log(req.user)   14834280-Uday is facebook id and is userID on parse server
    //res.sendfile("index.html");

    if (!req.user || !req.user.id)
        return res.redirect("/");

    var userQuery = new Parse.Query(User);
    userQuery.equalTo("userID", parseInt(req.user.id)).find({
        success: function(users) {
            if (users.length === 0) {
                return res.send("You are not registered with Re-App");
            }

            res.render("index", {
                givenName: req.user.displayName
            });
            res.render("index", {
                firstName: req.user.name.givenName
            });
            /*
            console.log("Got user:", user.get("firstName") + " " + user.get("lastName"), user.get("userID"));

            var itemsQuery = new Parse.Query(Item);

            itemsQuery.equalTo("user", user.get("userID"));
            itemsQuery.find({
                success: function(items) {
                    for (var i = 0; i < items.length; i++) {
                        console.log(items[i].get("name"), ", was Reused:", items[i].get("reused"));
                    }
                }
            });*/
        }
    });
});

app.get("/login", passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/authed',
        failureRedirect: '/'
    }));

app.listen(80);