/*This page is all of our server side stuff. Here we interact with facebook and parse before sending that information down to index.ejs*/
var categories = require("./cats.json");
var catData = require("./cat-data");

var facts = require("./fact.json");

var subStuff = [];
var mainStuff = [];
var allFacebookFriends = [];
var facebookMatches = [];

for (var key in categories) {
    for (var subKey in categories[key].subcategories) {
        var passMe = {
            image: categories[key].subcategories[subKey].image,
            value: categories[key].subcategories[subKey].value,
            categoryValue: categories[key].category,
            categoryName: key,
            subCategory: subKey
        }
        subStuff.push(passMe);
    }

}
for (var key in categories) {
    var passMe = {
        image: categories[key].image,
        category: categories[key].category,
        categoryName: key
    }
    mainStuff.push(passMe);
}
var facty = [];
for (var key in facts.factList) {
    var passMe = {
        thing: (facts.factList[key].thing).toString()
    }
    facty.push(passMe);

}
var app = require("ferb")(),
    express = require("express"),
    async = require("async"),
    request = require("request")

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
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
        clientID: "570622113030196",
        clientSecret: "1df07aa26984d8b194de2e59515d3327",
        callbackURL: "http://reapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        request("https://graph.facebook.com/me/friends?access_token=" + accessToken, function(err, r, body) {
            var bod = JSON.parse(body);
            var count = 0;
            for (var k in bod.data) {
                allFacebookFriends[count] = {
                    name: bod.data[k].name,
                    id: bod.data[k].id
                }
                count++;
            }
            done(null, profile);
        });

    }
));



Parse.initialize("naN50758keB99xyf9lrf1r5LjyuIGiPVwDfu3Y6w", "E4OZ0O3gioOueyIlyjD1MMFVq189RZD29AQazYc8");
//Parse.initialize("KOxUo1qxlR9WAXDKG1NteEMdftJT4esM0LWScX1x", "TmTCBsWIsOUuNeML4NSLEJdcZ7sIqzd8VuNeeSkm"); -- used for test app

var Item = Parse.Object.extend("Item");
//var Item = Parse.Object.extend("item"); -- used for test app
var User = Parse.Object.extend("user");

var groupUserItemsByCategory = function(userid, cb) {
    var q = new Parse.Query(Item);

    q.equalTo("user", parseInt(userid)).find({
        success: function(items) {
            var groups = {};
            items.forEach(function(item) {
                var category = item.get("category");
                groups[category] = groups[category] || [];

                groups[category].push({
                    name: item.get("name"),
                    category: category,
                    subcategory: item.get("subCategory")
                });
            });
            cb(null, groups);
        }
    });
}
//compares facebook friends to the Parse server
    function compareGroups(facebookFriends, callbacker) {
        if (facebookFriends.length === 0)
            return callbacker(null, [])

        var facebookIDs = [];
        for (x = 0; x < facebookFriends.length; x++) {
            facebookIDs.push(facebookFriends[x].id);
        }
        var User = Parse.Object.extend("user");

        var userTotal = new Parse.Query(User);
        var doneCount = facebookIDs.length;
        for (s = 0; s < facebookIDs.length; s++) {
            userTotal.equalTo("userID", parseInt(facebookIDs[s])).find({
                success: function(results) {
                    if (results.length > 0) {
                        var friend = {
                            name: results[0].attributes["firstName"] + " " + results[0].attributes["lastName"],
                            id: results[0].attributes["userID"]
                        }
                        if (facebookMatches.length === 0) {
                            facebookMatches.push(friend)

                        } else {
                            for (t = 0; t < facebookMatches.length; t++) {
                                if (facebookMatches[t].id === friend.id) {} else {
                                    facebookMatches.push(friend)
                                }
                            }
                        }

                    }
                    doneCount--;

                    if (doneCount === 0) {
                        callbacker(null, facebookMatches);
                    }
                }
            });
        }

    }
    //Maps out all the pictures for display
var buildPicturesMap = function() {
    var r = [];
    for (var k in categories) {
        var index = parseInt(categories[k].category);
        var subcats = {};
        r[index] = {
            image: categories[k].image,
            subcategories: subcats
        };

        for (sk in categories[k].subcategories) {
            subcats[parseInt(categories[k].subcategories[sk].value)] =
                categories[k].subcategories[sk].image;
        }
    }
    return r;
}

app.get("/", function(req, res) {
    res.sendfile("intro.html");
});

app.get("/authed", function(req, res) {

    if (!req.user || !req.user.id)
        return res.redirect("/");

    var userQuery = new Parse.Query(User);
    //Kind of like the main function here.
    var doStuffWithUser = function(users) {
        var userQuery = new Parse.Query(User);
        var userCount = new Parse.Query(User);
        var itemQuery = new Parse.Query(Item);
        var itemCount = new Parse.Query(Item);
        var personalID = req.user.id;

        //returns counts of each item. i dont even remember if this is still necessary
        function countItem(item, callbacker) {
            var q = new Parse.Query(Item);
            q.equalTo("category", item).count({
                success: function(count) {
                    callbacker(null, count);
                }
            })
        }

        //counts categories
        function countCat(callbacker) {
            var all = new Parse.Query(Item);
            var catArray = [];
            for (i = 1; i < 10; i++) {
                all.equalTo("category", i).count({
                    success: function(count) {
                        catArray.push(count);
                        callbacker(null, catArray);
                    }
                })
            }
        }

        //sorts the top 20 scores for the leaderboard
        function sortScore(callbacker) {
            var useScore = new Parse.Query(User);
            var thing = useScore;
            callbacker(null, thing);
        }

        //runs these in parallel to ensure they end up in the right spot in the return array
        async.parallel([
                //arr[0]
                function(callbacker) {
                    userCount.count({
                        success: function(count) {
                            callbacker(null, count);
                        }
                    })

                },
                //arr[1]
                function(callbacker) {
                    itemCount.count({
                        success: function(count) {
                            callbacker(null, count);
                        }
                    })
                },
                //arr[2]
                function(callbacker) {
                    async.map([1, 2, 3, 4, 5, 6, 7, 8, 9], countItem, function(err, r) {
                        callbacker(err, r)
                    });
                },
                //arr[3]
                function(callbacker) {
                    var userScoreQuery = new Parse.Query(User);
                    userScoreQuery.descending("score");
                    userScoreQuery.limit(20);
                    userScoreQuery.find({
                        success: function(results) {
                            callbacker(null, results);
                        }

                    })
                },
                //arr[4]
                function(callbacker) {
                    groupUserItemsByCategory(personalID, function(err, r) {
                        callbacker(err, r);
                    });
                },
                //arr[5]
                function(callbacker) {
                    compareGroups(allFacebookFriends, function(err, r) {
                        callbacker(err, r);
                    });
                }
            ],
            function(err, arr) {
                var count = 0;
                var leaderBoard = arr[3].map(function(r) {
                    count++;
                    return {
                        name: r.get("firstName") + " " + r.get("lastName"),
                        score: r.get("score"),
                        index: count
                    }
                });
                // sends these to index.ejs and can be called from there
                res.render("index", {
                    displayName: req.user.displayName,
                    givenName: req.user.name.givenName,
                    currentScore: users[0].attributes.score,
                    currentUsers: arr[0],
                    currentItems: arr[1],
                    catArray: arr[2],
                    leaderboard: leaderBoard,
                    allItems: JSON.stringify(arr[2]),
                    personalItems: arr[4],
                    allCatData: catData.getSanitizedData(),
                    persID: personalID,
                    picMap: buildPicturesMap(),
                    facts: facty,
                    faceMatch: arr[5]
                });
            });
    };


    userQuery.equalTo("userID", parseInt(req.user.id)).find({
        success: function(users) {
            if (users.length === 0) {
                var NewUser = Parse.Object.extend("user");
                var newUser = new NewUser();
                newUser.set("firstName", req.user.name.givenName);
                newUser.set("lastName", req.user.name.familyName);
                newUser.set("score", 0);
                newUser.set("userID", parseInt(req.user.id));
                newUser.save(null, {
                    success: function(newItemObject) {
                        doStuffWithUser([newUser]);

                    },
                    error: function(newItemObject, error) {}
                });
            } else
                doStuffWithUser(users);
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