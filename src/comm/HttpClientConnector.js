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

        var sending = false;
        var pendingCommands = [];

        this._executeSend = function(pendingCmd) {
            var data = pendingCmd.data;
            var onFinished = pendingCmd.onFinished;
            var sendDfd = pendingCmd.sendDfd;
            return $.ajax({
                    type: 'POST',
                    url: this.serverUrl,
                    data: data
                })
                .done(function (response) {
                    console.log("got response", response);
                    if (onFinished) {
                        // TODO return list of presentation models
                        onFinished(response);
                    }
                    sendDfd.resolve(response);
                })
                .fail(function (error) {
                    console.log("send error", pendingCmd, error);
                    sendDfd.reject(error);
                });
        };

        /**
         * @param command the command to send
         * @param onFinished the success callback
         * @returns send result promise (success, error)
         */
        this.send = function(command, onFinished) {
            var me = this;

            var dfd = $.Deferred();

            pendingCommands.push({
                data: this.codec.encode([command]),
                onFinished: onFinished,
                sendDfd: dfd
            });

            console.log("command queued", command);

            function _sendNext() {
                var next = pendingCommands.shift();
                if (next) {
                    console.log("sending ...", next);
                    sending = me._executeSend(next)
                        .always(function() {
                            _sendNext();
                        });
                } else {
                    console.log("nothing left to send");
                    sending = undefined;
                }
            }

            if (!sending) {
                _sendNext();
            }

            return dfd.promise();
        }

    };

});
