define([
    'comm/NamedCommand',
    'comm/HttpClientConnector'
], function(NamedCommand, HttpClientConnector) {

    var assert = buster.assert;

    buster.testCase("HttpClientConnector", {

        "setUp": function() {
        },

        "tearDown": function() {
        },

        "sends commands correctly": function(done) {
            var me = this;

            this.connector = new HttpClientConnector(null, '/dummy');

            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;

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
        },

        "sends multiple commands synchronously in order": function(done) {
            var me = this;

            buster.testRunner.timeout = 2000;

            this.connector = new HttpClientConnector(null, '/dummy');

            this.connector._executeSend = function(cmd) {
                var ajaxDfd = $.Deferred();
                if (cmd.data.indexOf("testA") != -1) {
                    console.log("resolving testA");
                    setTimeout(function() {
                        cmd.onFinished("testA ok");
                        cmd.dfd.resolve();
                        ajaxDfd.resolve();
                    }, 1000);
                } else {
                    console.log("resolving testB");
                    cmd.onFinished("testB ok");
                    cmd.dfd.resolve();
                    ajaxDfd.resolve();
                }
                return ajaxDfd.promise();
            };

            var receivedResponses = [];

            var sendCommand = function(cmd) {
                return me.connector.send(cmd, function(response) {
                    console.log("onFinished", response);
                    receivedResponses.push(cmd);
                });
            };

            var commandA = new NamedCommand("testA");
            var commandB = new NamedCommand("testB");

            var pA = sendCommand(commandA)
                .done(function() {
                    console.log("DONE A");
                    assert.equals(1, receivedResponses.length);
                    assert.equals(commandA, receivedResponses[0]);
                });

            var pB = sendCommand(commandB)
                .done(function() {
                    console.log("DONE B");
                    assert.equals(2, receivedResponses.length);
                    assert.equals(commandB, receivedResponses[1]);
                    done();
                });

        }

    });

});

