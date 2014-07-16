var categories = require("./cats.json");

var santizeObject = function(items) {
    var ret = [];
    for (n in items) {
        ret.push({
            name: n,
            image: items[n].image.replace(/^Re-App/, ""),
            categoryClass: n.toLowerCase() + "P",
            subcategoryClass: "sub" + n,
            subcategories: items[n].subcategories,
            index: items[n].category
        });
    }

    return ret;
};

var partition = function(items, c) {
    var ret = [];
    var pushto = null;

    for (var i = 0; i < items.length; i++) {
        if (i % c === 0) {
            pushto = [];
            ret.push(pushto);
        }

        pushto.push(items[i]);
    }

    return ret;
}

module.exports = {
    getSanitizedData: function() {
        return partition(santizeObject(categories), 3);
    }
};