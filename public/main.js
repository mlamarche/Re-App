/* This page switches between the main pages on index.ejs. There are also a few random function on here that were initially temporary. They can be moved*/
var current = "main";

function getRandom() {
    var rand = Math.random();
    return rand;
}

function pageChange(currentPage, toPage) {
    var $main = $('.page.main');
    var $recycle = $('.page.recycle');
    var $reuse = $('.page.reuse');
    var $friends = $('.page.friends');
    var $profile = $('.page.profile');
    var $leaderboard = $('.page.leaderboard');
    var $thanks = $('page.thanks');
    var $from = "";
    var $to = "";
    if (currentPage === "main") {
        $from = $main;
    } else if (currentPage === "recycle") {
        $from = $recycle;
    } else if (currentPage === "reuse") {
        $from = $reuse;
    } else if (currentPage === "friends") {
        $from = $friends;
    } else if (currentPage === "profile") {
        $from = $profile;
    } else if (currentPage === "leaderboard") {
        $from = $leaderboard;
    }
    if (toPage === "main") {
        $to = $main;
    } else if (toPage === "recycle") {
        $to = $recycle;
    } else if (toPage === "reuse") {
        $to = $reuse;
    } else if (toPage === "friends") {
        $to = $friends;
    } else if (toPage === "profile") {
        $to = $profile;
    } else if (toPage === "leaderboard") {
        $to = $leaderboard;
    }
    $from.fadeOut();
    $to.fadeIn();
    $(".subPicSpace").fadeOut();
    $("." + currentPage + "z").css('background-color', "white");
    $("." + toPage + "z").css('background-color', "#666666");
}
$(function() {
    $('button.toMain').click(function() {
        console.log("been clicked", current);
        if (current != "main") {
            pageChange(current, "main");
        }
        current = "main";
    });
    $('button.menuItem.recycle').click(function() {
        console.log("recycle has been clicked", current);
        if (current != "recycle") {
            pageChange(current, "recycle");
        }
        current = "recycle";
    });
    $('button.menuItem.reuse').click(function() {
        console.log("reuse has been clicked", current);
        if (current != "reuse") {
            pageChange(current, "reuse");
        }
        current = "reuse";
    });
    $('button.menuItem.friends').click(function() {
        console.log("friends has been clicked", current);
        if (current != "friends") {
            pageChange(current, "friends");
        }
        current = "friends";
    });
    $('button.menuItem.profile').click(function() {
        console.log("profile has been clicked", current);
        if (current != "profile") {
            pageChange(current, "profile");
        }
        current = "profile";
    });
    $('button.menuItem.leaderboard').click(function() {
        console.log("leaderboard has been clicked", current);
        if (current != "leaderboard") {
            pageChange(current, "leaderboard");
        }
        current = "leaderboard";
    });
    $('button.navBarItem.home').click(function() {
        console.log("returning to the home page", current);
        if (current != "main") {
            pageChange(current, "main");
        }
        current = "main";
    });
    console.log(current);
});
$(document).ready(function() {
    var img = $('<img />', {
        src: 'http://graph.facebook.com/' + persID + '/picture?type=square',
        class: "img-circle"
    });
    var mahImg = $('<img />', {
        src: 'http://graph.facebook.com/' + persID + '/picture?type=large',
        class: "img-circle",
        id: "coolPic"
    });
    mahImg.appendTo('.picHere');
    img.appendTo('.proPic');
});