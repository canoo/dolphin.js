// Require.js allows us to configure shortcut alias
require.config({

    baseUrl: '',

//    deps : [
//        "src/app/init"
//    ],

    paths: {
//        models                  : 'src/app/models',
    }
});

require([], function () {
    console.log("INIT DONE");
});
