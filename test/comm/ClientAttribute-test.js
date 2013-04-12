define([
    'comm/ClientAttribute'
], function(ClientAttribute) {

    var assert = buster.assert;
    var refute = buster.refute;

    buster.testCase("ClientAttribute", {

        "fires valueChange event upon setValue call": function () {
            var attr = new ClientAttribute();

            var newValue = "new!";

            attr.on("valueChange", function(data) {
                console.log("got valueChange", data);
                assert.equals(newValue, data.newValue);
            });

            attr.setValue(newValue);
        },

        "is created with unique id": function () {
            var id1 = new ClientAttribute().id;
            var id2 = new ClientAttribute().id;
            refute.equals(id1, id2);
        }

    })

});

