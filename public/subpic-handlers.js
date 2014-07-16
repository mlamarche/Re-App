$(function() {
    $(document).on("click", ".subPicSpace button", function(e) {
        e.preventDefault();
        var dataVal = $(this).find("img").attr("data-value");
        var catIndex = $(this).closest('.subPicSpace').attr("data-cat-index");
        var catName = $(this).find("img").attr("data-name");
        var dataReuse = $(this).find("img").attr("data-reuse");
        var dataID = $(this).find("img").attr("data-id");

        var NewItem = Parse.Object.extend("item");
        var newItem = new NewItem();

        newItem.set("subCategory", dataVal);
        newItem.set("category", catIndex);
        newItem.set("name", catName);
        newItem.set("reused", dataReuse);
        newItem.set("user", dataID);
        console.log(newItem);

        console.log("Clicked on item: category:", catIndex, ", subcategory:", dataVal, ", name: ", catName, ", is reused: ", dataReuse, ", id:", dataID);
    });
});