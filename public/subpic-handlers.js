function newOther(text, cats, dataReuseOther) {
    var NewItemOther = Parse.Object.extend("Item");
    var newItemOther = new NewItemOther();
    console.log(cats);
    newItemOther.set("subCategory", 100);
    newItemOther.set("category", parseInt(cats) + 1);
    newItemOther.set("name", text);
    newItemOther.set("reused", dataReuseOther == "true");
    newItemOther.set("user", persID);
    newItemOther.set("size", 1);

    console.log(newItemOther);
    newItemOther.save(null, {
        success: function(newItemObject) {
            // Execute any logic that should take place after the object is saved.
            currentScore++;
            $(".navBarItem.score").text(currentScore);
            $(".bigScore").text(currentScore);

            Parse.Cloud.run("updateScore", {
                userId: persID,
                score: currentScore
            }, {
                success: function(results) {
                    console.log(results);
                },
                error: function(error) {
                    console.log(error);
                }
            });
            console.log('New object created with objectId: ' + newItemObject.id);
            var rand = Math.random();
            rand = rand * 81;
            rand = Math.round(rand)
            $('.factoid').text(factsy[rand].thing)
            $('#myThanks').modal('show');
        },
        error: function(newItemObject, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            console.log('Failed to create new object, with error code: ' + error.message);
        }
    });

}

$(function() {
    //Parse.initialize("KOxUo1qxlR9WAXDKG1NteEMdftJT4esM0LWScX1x", "TmTCBsWIsOUuNeML4NSLEJdcZ7sIqzd8VuNeeSkm");
    Parse.initialize("naN50758keB99xyf9lrf1r5LjyuIGiPVwDfu3Y6w", "E4OZ0O3gioOueyIlyjD1MMFVq189RZD29AQazYc8");



    $(document).on("click", ".subPicSpace button", function(e) {
        e.preventDefault();
        var dataVal = $(this).find("img").attr("data-value");
        var catIndex = $(this).closest('.subPicSpace').attr("data-cat-index");
        var catName = $(this).find("img").attr("data-name");
        var dataReuse = $(this).find("img").attr("data-reuse");
        var dataID = $(this).find("img").attr("data-id");
        var isOther = false;

        var NewItem = Parse.Object.extend("Item");
        var newItem = new NewItem();
        if (catName === "Other") {
            isOther = true;
            $("#myModal").modal('show');
            $('#myModal').on('shown.bs.modal', function() {
                $('#inputtext').focus();
            });
            $('#addbutton').on("click", function() {
                text = $('#inputtext').val();
                if (text != "") {
                    catName = text;
                    newItem.set("subCategory", parseInt(dataVal));
                    newItem.set("category", parseInt(catIndex) + 1);
                    newItem.set("name", catName);
                    newItem.set("reused", dataReuse == "true");
                    newItem.set("user", parseInt(dataID));
                    newItem.set("size", 1);

                    newItem.save(null, {
                        success: function(newItem) {
                            // Execute any logic that should take place after the object is saved.
                            currentScore++;
                            $(".navBarItem.score").text(currentScore);
                            $(".bigScore").text(currentScore);

                            Parse.Cloud.run("updateScore", {
                                userId: persID,
                                score: currentScore
                            }, {
                                success: function(results) {
                                    console.log("success");
                                },
                                error: function(error) {
                                    console.log(error);
                                }
                            });
                            console.log('New object created with objectId: ' + newItem.id);
                            var rand = Math.random();
                            rand = rand * 81;
                            rand = Math.round(rand)
                            $('.factoid').text(factsy[rand].thing)
                            $('#myThanks').modal('show');
                        },
                        error: function(newItem, error) {
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and description.
                            console.log('Failed to create new object, with error code: ' + error.message);
                        }
                    });
                }
                $('#inputtext').val('');
            });
            $('#inputtext').on("keydown", function(e) {
                if (e.keyCode === 13) {
                    text = $('#inputtext').val();
                    if (text != "") {
                        catName = text;
                        newItem.set("subCategory", parseInt(dataVal));
                        newItem.set("category", parseInt(catIndex) + 1);
                        newItem.set("name", catName);
                        newItem.set("reused", dataReuse == "true");
                        newItem.set("user", parseInt(dataID));
                        newItem.set("size", 1);

                        newItem.save(null, {
                            success: function(newItem) {
                                // Execute any logic that should take place after the object is saved.
                                currentScore++;
                                $(".navBarItem.score").text(currentScore);
                                $(".bigScore").text(currentScore);

                                Parse.Cloud.run("updateScore", {
                                    userId: persID,
                                    score: currentScore
                                }, {
                                    success: function(results) {
                                        console.log("success");
                                    },
                                    error: function(error) {
                                        console.log(error);
                                    }
                                });
                                console.log('New object created with objectId: ' + newItem.id);
                                var rand = Math.random();
                                rand = rand * 81;
                                rand = Math.round(rand)
                                $('.factoid').text(factsy[rand].thing)
                                $('#myThanks').modal('show');
                            },
                            error: function(newItem, error) {
                                // Execute any logic that should take place if the save fails.
                                // error is a Parse.Error with an error code and description.
                                console.log('Failed to create new object, with error code: ' + error.message);
                            }
                        });
                    }
                    $('#inputtext').val('');
                    $('#myModal').modal('hide');
                }
            });
        }
        if (isOther === false) {
            newItem.set("subCategory", parseInt(dataVal));
            newItem.set("category", parseInt(catIndex) + 1);
            newItem.set("name", catName);
            newItem.set("reused", dataReuse == "true");
            newItem.set("user", parseInt(dataID));
            newItem.set("size", 1);

            newItem.save(null, {
                success: function(newItem) {
                    // Execute any logic that should take place after the object is saved.
                    currentScore++;
                    $(".navBarItem.score").text(currentScore);
                    $(".bigScore").text(currentScore);

                    Parse.Cloud.run("updateScore", {
                        userId: persID,
                        score: currentScore
                    }, {
                        success: function(results) {
                            console.log("success");
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                    console.log('New object created with objectId: ' + newItem.id);
                    var rand = Math.random();
                    rand = rand * 81;
                    rand = Math.round(rand)
                    $('.factoid').text(factsy[rand].thing)
                    $('#myThanks').modal('show');
                },
                error: function(newItem, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and description.
                    console.log('Failed to create new object, with error code: ' + error.message);
                }
            });
        }
        isOther = false;
        $('.subPicSpace').fadeOut();
    });
});