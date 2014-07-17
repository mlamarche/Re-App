$(function() {
    var currentSub = "";
    $('.glassP').click(function() {
        console.log("Glass has been clicked OMG");
        if (currentSub === "glass") {
            currentSub = "";
            $(".subPicSpace.subglassP").fadeOut();
        } else {
            subChange(currentSub, "glass");
            currentSub = "glass";
            $(".subPicSpace.subglassP").fadeIn();
        }
    });
    $('.plasticP').click(function() {
        console.log("Plastic has been clicked OMG");
        if (currentSub === "plastic") {
            currentSub = "";
            $(".subPicSpace.subplasticP").fadeOut();
        } else {
            subChange(currentSub, "plastic");
            currentSub = "plastic";
            $(".subPicSpace.subplasticP").fadeIn();
        }
    });
    $('.paperP').click(function() {
        console.log("Paper has been clicked OMG");
        if (currentSub === "paper") {
            currentSub = "";
            $(".subPicSpace.subpaperP").fadeOut();
        } else {
            subChange(currentSub, "paper");
            currentSub = "paper";
            $(".subPicSpace.subpaperP").fadeIn();
        }
    });
    $('.metalP').click(function() {
        console.log("Metal has been clicked OMG");
        if (currentSub === "metal") {
            currentSub = "";
            $(".subPicSpace.submetalP").fadeOut();
        } else {
            subChange(currentSub, "metal");
            currentSub = "metal";
            $(".subPicSpace.submetalP").fadeIn();
        }
    });
    $('.battery-bulbP').click(function() {
        console.log("Batteries has been clicked OMG");
        if (currentSub === "batteries") {
            currentSub = "";
            $(".subPicSpace.subbattery-bulbP").fadeOut();
        } else {
            subChange(currentSub, "batteries");
            currentSub = "batteries";
            $(".subPicSpace.subbattery-bulbP").fadeIn();
        }
    });
    $('.clothP').click(function() {
        console.log("Cloth has been clicked OMG");
        if (currentSub === "cloth") {
            currentSub = "";
            $(".subPicSpace.subclothP").fadeOut();
        } else {
            subChange(currentSub, "cloth");
            currentSub = "cloth";
            $(".subPicSpace.subclothP").fadeIn();
        }
    });
    $('.electronicsP').click(function() {
        console.log("Electronics has been clicked OMG");
        if (currentSub === "electronics") {
            currentSub = "";
            $(".subPicSpace.subelectronicsP").fadeOut();
        } else {
            subChange(currentSub, "electronics");
            currentSub = "electronics";
            $(".subPicSpace.subelectronicsP").fadeIn();
        }
    });
    $('.garageP').click(function() {
        console.log("Garage has been clicked OMG");
        if (currentSub === "garage") {
            currentSub = "";
            $(".subPicSpace.subgarageP").fadeOut();
        } else {
            subChange(currentSub, "garage");
            currentSub = "garage";
            $(".subPicSpace.subgarageP").fadeIn();
        }
    });
    $('.otherP').click(function() {
        var dataReuseOther = $(this).find("img").attr("data-reuse");
        var cats = $(this).find("img").attr("data-cat");
        console.log("Other has been clicked OMG");
        $("#myModal").modal('show');
        $('#myModal').on('shown.bs.modal', function() {
            $('#inputtext').focus();
        });
        $('#addbutton').on("click", function() {
            text = $('#inputtext').val();
            if (text != "") {
                newOther(text, cats, dataReuseOther);
            }
            $('#inputtext').val('');
        });
        $('#inputtext').on("keydown", function(e) {
            if (e.keyCode === 13) {
                text = $('#inputtext').val();
                if (text != "") {
                    newOther(text, cats, dataReuseOther);
                }
                $('#inputtext').val('');
                $('#myModal').modal('hide');
            }
        });
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
        }
        if (currentPage != "") {
            $from.fadeOut();
        }
        if (currentPage != "") {
            $to.fadeIn();
        }
        //$from.off('click');
    }

});