define([
    'comm/Utils'
], function(Utils) {

    var assert = buster.assert;

    buster.testCase("Utils", {

        "implements stable hashCode for any object": function () {
            assert.equals(0, Utils.hashCode(undefined));
            assert.equals(1088, Utils.hashCode(""));
            assert.equals(1143417331, Utils.hashCode({ "testme": "value" }));
        }

    });

});

