var config = module.exports;

config["Browser"] = {
    rootPath   : "..",
    environment: "browser", // or "node"

    autoRun  : false,

    extensions: [
        require("buster-amd")
    ],

    libs     : [
        "src/scripts/requirejs/require.js",
        "test/main-setup.js"
    ],

    resources: [
    ],

    sources: [
        "src/app/**/*.js"
    ],

    tests: [
        "test/app/**/*-test.js"
    ]
};
