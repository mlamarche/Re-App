 console.log("hello");
 $(function() {
     var current = "intro";

     function pageChange(currentPage, toPage) {
         var $intro = $('.page.intro');
         var $main = $('.page.main');
         var $recycle = $('.page.recycle');
         var $reuse = $('.page.reuse');
         var $friends = $('.page.friends');
         var $bin = $('.page.bin');
         var $profile = $('.page.profile');
         var $leaderboard = $('.page.leaderboard');
         var $from = "";
         var $to = "";
         if (currentPage === "intro") {
             $from = $intro;
         } else if (currentPage === "main") {
             $from = $main;
         } else if (currentPage === "recycle") {
             $from = $recycle;
         } else if (currentPage === "reuse") {
             $from = $reuse;
         } else if (currentPage === "friends") {
             $from = $friends;
         } else if (currentPage === "bin") {
             $from = $bin;
         } else if (currentPage === "profile") {
             $from = $profile;
         } else if (currentPage === "leaderboard") {
             $from = $leaderboard;
         }
         if (toPage === "intro") {
             $to = $intro;
         } else if (toPage === "main") {
             $to = $main;
         } else if (toPage === "recycle") {
             $to = $recycle;
         } else if (toPage === "reuse") {
             $to = $reuse;
         } else if (toPage === "friends") {
             $to = $friends;
         } else if (toPage === "bin") {
             $to = $bin;
         } else if (toPage === "profile") {
             $to = $profile;
         } else if (toPage === "leaderboard") {
             $to = $leaderboard;
         }
         console.log($from);
         console.log($intro);
         $from.fadeOut();
         $to.show();
         $from.off('click');
     }

     $('button.toMain').click(function() {
         console.log("been clicked");
         if (current != "main") {
             pageChange(current, "main");
         }
         current = "main";
     });
     $('button.menuItem.recycle').click(function() {
         console.log("recycle has been clicked");
         if (current != "recycle") {
             pageChange(current, "recycle");
         }
         current = "recycle";
     });
     $('button.menuItem.reuse').click(function() {
         console.log("reuse has been clicked");
         if (current != "reuse") {
             pageChange(current, "reuse");
         }
         current = "reuse";
     });
     $('button.menuItem.friends').click(function() {
         console.log("friends has been clicked");
         if (current != "friends") {
             pageChange(current, "friends");
         }
         current = "friends";
     });
     $('button.menuItem.bin').click(function() {
         console.log("bin has been clicked");
         if (current != "bin") {
             pageChange(current, "bin");
         }
         current = "bin";
     });
     $('button.menuItem.profile').click(function() {
         console.log("profile has been clicked");
         if (current != "profile") {
             pageChange(current, "profile");
         }
         current = "profile";
     });
     $('button.menuItem.leaderboard').click(function() {
         console.log("leaderboard has been clicked");
         if (current != "leaderboard") {
             pageChange(current, "leaderboard");
         }
         current = "leaderboard";
     });
     console.log(current);
 });