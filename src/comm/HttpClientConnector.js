define(function () {

    return function(clientDolphin, serverUrl) {

        this.clientDolphin = clientDolphin;
        this.serverUrl = serverUrl;

        this.getClientDolphin = function() {
            return this.clientDolphin;
        };

        this.getServerUrl = function() {
            return this.serverUrl;
        };

    };

});
