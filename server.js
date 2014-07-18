// server.js
// do server stuff
//



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
            //console.log(body);
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
//Parse.initialize("KOxUo1qxlR9WAXDKG1NteEMdftJT4esM0LWScX1x", "TmTCBsWIsOUuNeML4NSLEJdcZ7sIqzd8VuNeeSkm");

var Item = Parse.Object.extend("Item");
//var Item = Parse.Object.extend("item");
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

    function compareGroups(facebookFriends, callbacker) {
        if (facebookFriends.length === 0)
            return callbacker(null, [])

        var facebookIDs = [];
        for (x = 0; x < facebookFriends.length; x++) {
            facebookIDs.push(facebookFriends[x].id);
        }
        //console.log(facebookIDs)
        var User = Parse.Object.extend("user");

        var userTotal = new Parse.Query(User);
        var doneCount = facebookIDs.length;
        for (s = 0; s < facebookIDs.length; s++) {
            //console.log(s, "  ", facebookIDs[s])
            userTotal.equalTo("userID", parseInt(facebookIDs[s])).find({
                success: function(results) {
                    if (results.length > 0) {
                        // console.log(results);
                        //console.log(results[0].attributes["userID"])
                        var friend = {
                            name: results[0].attributes["firstName"] + " " + results[0].attributes["lastName"],
                            id: results[0].attributes["userID"]
                        }
                        console.log(friend) //2
                        if (facebookMatches.length === 0) {
                            facebookMatches.push(friend)

                        } else {
                            for (t = 0; t < facebookMatches.length; t++) {
                                if (facebookMatches[t].id === friend.id) {
                                    console.log("no");
                                } else {
                                    facebookMatches.push(friend)
                                }
                            }
                        }
                        console.log(facebookMatches + "fbm") //1

                    }
                    doneCount--;

                    if (doneCount === 0) {
                        callbacker(null, facebookMatches);
                    }
                }
            });
        }

    }

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

    var doStuffWithUser = function(users) {
        var userQuery = new Parse.Query(User);
        var userCount = new Parse.Query(User);
        var itemQuery = new Parse.Query(Item);
        var itemCount = new Parse.Query(Item);
        var personalID = req.user.id;


        function countItem(item, callbacker) {
            var q = new Parse.Query(Item);
            q.equalTo("category", item).count({
                success: function(count) {
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
                        callbacker(null, catArray);
                    }
                })
            }
        }

        function sortScore(callbacker) {
            var useScore = new Parse.Query(User);
            var thing = useScore;
            callbacker(null, thing);
        }


        console.log("Running async parallel")
        async.parallel([

                function(callbacker) {
                    userCount.count({
                        success: function(count) {
                            console.log("c1");
                            callbacker(null, count);
                        }
                    })

                },
                function(callbacker) {
                    itemCount.count({
                        success: function(count) {
                            console.log("c2");
                            callbacker(null, count);
                        }
                    })
                },
                function(callbacker) {
                    async.map([1, 2, 3, 4, 5, 6, 7, 8, 9], countItem, function(err, r) {
                        console.log("c6");
                        callbacker(err, r)
                    });
                },
                function(callbacker) {
                    var userScoreQuery = new Parse.Query(User);
                    userScoreQuery.descending("score");
                    userScoreQuery.limit(20);
                    userScoreQuery.find({
                        success: function(results) {
                            console.log("c3");
                            callbacker(null, results);
                        }

                    })
                },
                function(callbacker) {
                    //console.log(personalID + " Hello World");
                    groupUserItemsByCategory(personalID, function(err, r) {
                        console.log("c4");
                        callbacker(err, r);
                    });
                },
                function(callbacker) {
                    compareGroups(allFacebookFriends, function(err, r) {
                        console.log("c5");
                        callbacker(err, r);
                    });
                }
            ],
            function(err, arr) {
                console.log("Have all results")
                var count = 0;
                console.log(arr[5])
                var leaderBoard = arr[3].map(function(r) {
                    count++;
                    return {
                        name: r.get("firstName") + " " + r.get("lastName"),
                        score: r.get("score"),
                        index: count
                    }
                });
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

    console.log("Looking for user");

    userQuery.equalTo("userID", parseInt(req.user.id)).find({
        success: function(users) {
            console.log("Return for user with id:", req.user.id, users.length)
            if (users.length === 0) {
                var NewUser = Parse.Object.extend("user");
                var newUser = new NewUser();
                newUser.set("firstName", req.user.name.givenName);
                newUser.set("lastName", req.user.name.familyName);
                newUser.set("score", 0);
                newUser.set("userID", parseInt(req.user.id));
                newUser.save(null, {
                    success: function(newItemObject) {
                        // Execute any logic that should take place after the object is saved.
                        console.log('New user created with objectId: ' + newItemObject.id);
                        doStuffWithUser([newUser]);

                    },
                    error: function(newItemObject, error) {
                        console.log('Failed to create new user, with error code: ' + error.message);
                    }
                });
                //return res.send("You are not registered with Re-App");
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