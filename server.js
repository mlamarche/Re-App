// server.js
// do server stuff
//



var categories = [{},

    {
        name: "Glass",
        subcategories: [
            "Clear Bottle",
            "Brown Bottle",
            "Green Bottle",
            "Container (sm)",


        ]
    },

    {


    }


];


var app = require("ferb")(),
    express = require("express"),
    async = require("async")


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
    // console.log("Serializing", user)
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    //console.log("De-serializing", user)
    done(null, user);
});

passport.use(new FacebookStrategy({
        clientID: "570622113030196",
        clientSecret: "1df07aa26984d8b194de2e59515d3327",
        callbackURL: "http://reapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        //console.log("Got auth", accessToken, refreshToken, profile);
        // console.log(profile.id);
        //console.log("welcome ", profile.name.givenName)
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
    var userCount = new Parse.Query(User);
    var itemQuery = new Parse.Query(Item);
    var itemCount = new Parse.Query(Item);

    userQuery.equalTo("userID", parseInt(req.user.id)).find({
        success: function(users) {
            if (users.length === 0) {
                return res.send("You are not registered with Re-App");
            }

            function countItem(item, callbacker) {
                var q = new Parse.Query(Item);
                q.equalTo("category", item).count({
                    success: function(count) {
                        console.log(count, " Kings", item);
                        callbacker(null, count);
                    }
                })
            }

            function countCat(callbacker) {
                var all = new Parse.Query(Item);
                var catArray = [];
                for (i = 1; i < 10; i++) {
                    all.equalTo("category", i).count({
                        success: function(count) {
                            catArray.push(count);
                            console.log(catArray);
                            callbacker(null, catArray);
                        }

                    })
                }

            }

            function sortScore(callbacker) {
                var useScore = new Parse.Query(User);
                console.log(useScore + "Conan O Brian");
                //useScore.equalTo("score").count
                var thing = useScore;
                callbacker(null, thing);
            }


            async.parallel([

                function(callbacker) {
                    userCount.count({
                        success: function(count) {
                            console.log(count, " Frodos");
                            callbacker(null, count);
                        }
                    })

                },
                function(callbacker) {
                    itemCount.count({
                        success: function(count) {
                            console.log(count, " Rings");
                            callbacker(null, count);
                        }
                    })
                },
                function(callbacker) {
                    async.map([1, 2, 3, 4, 5, 6, 7, 8, 9], countItem, callbacker);
                }



            ], function(err, arr) {
                console.log(arr);
                res.render("index", {
                    displayName: req.user.displayName,
                    givenName: req.user.name.givenName,
                    currentScore: users[0]._serverData.score,
                    currentUsers: arr[0],
                    currentItems: arr[1],
                    catArray: arr[2],
                    allItems: JSON.stringify(arr[2]),

                });
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