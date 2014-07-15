$(function() {
    var current = "";
    $('.glassP').click(function() {
        console.log("Glass has been clicked OMG");
        if (current === "glass") {
            current = "";
            $(".subPicSpace.subGlass").fadeOut();
        } else {
            subChange(current, "glass");
            current = "glass";
            $(".subPicSpace.subGlass").fadeIn();
        }
    });
    $('.plasticP').click(function() {
        console.log("Plastic has been clicked OMG");
        if (current === "plastic") {
            current = "";
            $(".subPicSpace.subPlastic").fadeOut();
        } else {
            subChange(current, "plastic");
            current = "plastic";
            $(".subPicSpace.subPlastic").fadeIn();
        }
    });
    $('.paperP').click(function() {
        console.log("Paper has been clicked OMG");
        if (current === "paper") {
            current = "";
            $(".subPicSpace.subPaper").fadeOut();
        } else {
            subChange(current, "paper");
            current = "paper";
            $(".subPicSpace.subPaper").fadeIn();
        }
    });
    $('.metalP').click(function() {
        console.log("Metal has been clicked OMG");
        if (current === "metal") {
            current = "";
            $(".subPicSpace.subMetal").fadeOut();
        } else {
            subChange(current, "metal");
            current = "metal";
            $(".subPicSpace.subMetal").fadeIn();
        }
    });
    $('.batteriesP').click(function() {
        console.log("Batteries has been clicked OMG");
        if (current === "batteries") {
            current = "";
            $(".subPicSpace.subBatteries").fadeOut();
        } else {
            subChange(current, "batteries");
            current = "batteries";
            $(".subPicSpace.subBatteries").fadeIn();
        }
    });
    $('.clothP').click(function() {
        console.log("Cloth has been clicked OMG");
        if (current === "cloth") {
            current = "";
            $(".subPicSpace.subCloth").fadeOut();
        } else {
            subChange(current, "cloth");
            current = "cloth";
            $(".subPicSpace.subCloth").fadeIn();
        }
    });
    $('.electronicsP').click(function() {
        console.log("Electronics has been clicked OMG");
        if (current === "electronics") {
            current = "";
            $(".subPicSpace.subElectronics").fadeOut();
        } else {
            subChange(current, "electronics");
            current = "electronics";
            $(".subPicSpace.subElectronics").fadeIn();
        }
    });
    $('.garageP').click(function() {
        console.log("Garage has been clicked OMG");
        if (current === "garage") {
            current = "";
            $(".subPicSpace.subGarage").fadeOut();
        } else {
            subChange(current, "garage");
            current = "garage";
            $(".subPicSpace.subGarage").fadeIn();
        }
    });
    $('.otherP').click(function() {
        console.log("Other has been clicked OMG");
        if (current === "other") {
            current = "";
            $(".subPicSpace.subOther").fadeOut();
        } else {
            subChange(current, "other");
            current = "other";
            $(".subPicSpace.subOther").fadeIn();
        }
    });

    function subChange(currentPage, toPage) {
        var $glass = $('.subPicSpace.subGlass');
        var $plastic = $('.subPicSpace.subPlastic');
        var $paper = $('.subPicSpace.subPaper');
        var $metal = $('.subPicSpace.subMetal');
        var $batteries = $('.subPicSpace.subBatteries');
        var $cloth = $('.subPicSpace.subCloth');
        var $electronics = $('.subPicSpace.subElectronics');
        var $garage = $('.subPicSpace.subGarage');
        var $other = $('.subPicSpace.subOther');
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