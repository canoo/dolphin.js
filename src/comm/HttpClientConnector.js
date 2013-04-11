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

        this.send = function(command, onFinished) {
            var data = this.codec.encode([command]);

            $.support.cors = true;

            return $.ajax({
                type: 'POST',
                url: this.serverUrl,
                data: data
            })
            .done(function(response) {
                console.log("got response", response);
                if (onFinished) {
                    console.log("onFinished called", typeof onFinished === 'function');
                    // TODO return list of presentation models
                    onFinished(response);
                }
            })
            .fail(function(error) {
                console.log(error);
//                alert(JSON.stringify(error));
            });

        }

    };

});
