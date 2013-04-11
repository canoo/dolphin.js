define([
    'comm/NamedCommand',
    'comm/HttpClientConnector'
], function(NamedCommand, HttpClientConnector) {

    var assert = buster.assert;

    buster.testCase("HttpClientConnector", {

        "setUp": function() {
            this.connector = new HttpClientConnector(null, '/dummy');

            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;
        },

        "sends commands correctly": function(done) {
            var me = this;
            this.server.respondWith(
                    "POST",
                    "/dummy",
                    [
                        200,
                        { "Content-Type": "application/json" },
                        '[]'
                    ]);

            var command = new NamedCommand("test");
            this.connector.send(command, function(response) {
                console.log("got test response", response);
                assert.equals([], response);

                var request = me.server.requests[0];
                assert.equals(200, request.status);
                assert.equals("POST", request.method);
                assert.equals(
                        '[{"id":"test","className":"org.opendolphin.core.comm.NamedCommand"}]',
                        request.requestBody);

                done();
            });
        }

    });

});

