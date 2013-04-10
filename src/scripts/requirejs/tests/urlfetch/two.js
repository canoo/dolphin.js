define("one", {
    name: "one"
});

define("two", ["../../../../."], function (one) {
    return {
        name: "two",
        oneName: "one"
    };
});
