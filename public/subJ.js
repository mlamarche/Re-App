$(function() {
    var current = "";
    $('.glassP').click(function() {
        console.log("Glass has been clicked OMG");
        if (current === "glass") {
            current = "";
            $(".subPicSpace.subglassP").fadeOut();
        } else {
            subChange(current, "glass");
            current = "glass";
            $(".subPicSpace.subglassP").fadeIn();
        }
    });
    $('.plasticP').click(function() {
        console.log("Plastic has been clicked OMG");
        if (current === "plastic") {
            current = "";
            $(".subPicSpace.subplasticP").fadeOut();
        } else {
            subChange(current, "plastic");
            current = "plastic";
            $(".subPicSpace.subplasticP").fadeIn();
        }
    });
    $('.paperP').click(function() {
        console.log("Paper has been clicked OMG");
        if (current === "paper") {
            current = "";
            $(".subPicSpace.subpaperP").fadeOut();
        } else {
            subChange(current, "paper");
            current = "paper";
            $(".subPicSpace.subpaperP").fadeIn();
        }
    });
    $('.metalP').click(function() {
        console.log("Metal has been clicked OMG");
        if (current === "metal") {
            current = "";
            $(".subPicSpace.submetalP").fadeOut();
        } else {
            subChange(current, "metal");
            current = "metal";
            $(".subPicSpace.submetalP").fadeIn();
        }
    });
    $('.battery-bulbP').click(function() {
        console.log("Batteries has been clicked OMG");
        if (current === "batteries") {
            current = "";
            $(".subPicSpace.subbattery-bulbP").fadeOut();
        } else {
            subChange(current, "batteries");
            current = "batteries";
            $(".subPicSpace.subbattery-bulbP").fadeIn();
        }
    });
    $('.clothP').click(function() {
        console.log("Cloth has been clicked OMG");
        if (current === "cloth") {
            current = "";
            $(".subPicSpace.subclothP").fadeOut();
        } else {
            subChange(current, "cloth");
            current = "cloth";
            $(".subPicSpace.subclothP").fadeIn();
        }
    });
    $('.electronicsP').click(function() {
        console.log("Electronics has been clicked OMG");
        if (current === "electronics") {
            current = "";
            $(".subPicSpace.subelectronicsP").fadeOut();
        } else {
            subChange(current, "electronics");
            current = "electronics";
            $(".subPicSpace.subelectronicsP").fadeIn();
        }
    });
    $('.garageP').click(function() {
        console.log("Garage has been clicked OMG");
        if (current === "garage") {
            current = "";
            $(".subPicSpace.subgarageP").fadeOut();
        } else {
            subChange(current, "garage");
            current = "garage";
            $(".subPicSpace.subgarageP").fadeIn();
        }
    });
    $('.otherP').click(function() {
        console.log("Other has been clicked OMG");
        if (current === "other") {
            current = "";
            $(".subPicSpace.subotherP").fadeOut();
        } else {
            subChange(current, "other");
            current = "other";
            $(".subPicSpace.subotherP").fadeIn();
        }
    });

    function subChange(currentPage, toPage) {
        var $glass = $('.subPicSpace.subglassP');
        var $plastic = $('.subPicSpace.subplasticP');
        var $paper = $('.subPicSpace.subpaperP');
        var $metal = $('.subPicSpace.submetalP');
        var $batteries = $('.subPicSpace.subbattery-bulbP');
        var $cloth = $('.subPicSpace.subclothP');
        var $electronics = $('.subPicSpace.subelectronicsP');
        var $garage = $('.subPicSpace.subgarageP');
        var $other = $('.subPicSpace.subotherP');
        var $from = "";
        var $to = "";
        if (currentPage === "glass") {
            $from = $glass;
        } else if (currentPage === "plastic") {
            $from = $plastic;
        } else if (currentPage === "paper") {
            $from = $paper;
        } else if (currentPage === "metal") {
            $from = $metal;
        } else if (currentPage === "batteries") {
            $from = $batteries;
        } else if (currentPage === "cloth") {
            $from = $cloth;
        } else if (currentPage === "electronics") {
            $from = $electronics;
        } else if (currentPage === "garage") {
            $from = $garage;
        } else if (currentPage === "other") {
            $from = $other;
        }
        if (toPage === "glass") {
            $to = $glass;
        } else if (toPage === "plastic") {
            $to = $plastic;
        } else if (toPage === "paper") {
            $to = $paper;
        } else if (toPage === "metal") {
            $to = $metal;
        } else if (toPage === "batteries") {
            $to = $batteries;
        } else if (toPage === "cloth") {
            $to = $cloth;
        } else if (toPage === "electronics") {
            $to = $electronics;
        } else if (toPage === "garage") {
            $to = $garage;
        } else if (toPage === "other") {
            $to = $other;
        }
        if (currentPage != "") {
            $from.fadeOut();
        }
        $to.fadeIn();
        //$from.off('click');
    }

});