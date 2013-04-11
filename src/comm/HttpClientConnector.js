define([
    '$',
    'comm/Codec'
], function ($, Codec) {

    return function(clientDolphin, serverUrl) {
        this.codec = new Codec();

        this.clientDolphin = clientDolphin;
        this.serverUrl = serverUrl;

        this.getClientDolphin = function() {
            return this.clientDolphin;
        };

        this.getServerUrl = function() {
            return this.serverUrl;
        };

        this.sending = false;
        this.pendingCommands = [];

        this._executeSend = function(cmd) {
            var _data = cmd.data;
            var _onFinished = cmd.onFinished;
            var _dfd = cmd.dfd;
            return $.ajax({
                    type: 'POST',
                    url: this.serverUrl,
                    data: _data
                })
                .done(function (response) {
                    console.log("got response", response);
                    if (_onFinished) {
                        // TODO return list of presentation models
                        _onFinished(response);
                    }
                    _dfd.resolve(response);
                })
                .fail(function (error) {
                    console.log("send error", cmd, error);
                    _dfd.reject(error);
                });
        };

        this.send = function(command, onFinished) {
            var me = this;

            var dfd = $.Deferred();

            this.pendingCommands.push({
                data: this.codec.encode([command]),
                onFinished: onFinished,
                dfd: dfd
            });


            function sendNext() {
                var nextCommand = me.pendingCommands.shift();
                if (nextCommand) {
                    console.log("sending ...", nextCommand);
                    me.sending = true;
                    me._executeSend(nextCommand)
                        .always(function() {
                            sendNext();
                        });
                } else {
                    me.sending = false;
                }
            }

            if (!this.sending) {
                sendNext();
            }

            return dfd.promise();
        }

    };

});
