define([
    'comm/ClientDolphin',
    'comm/ClientModelStore',
    'comm/HttpClientConnector'
], function (ClientDolphin, ClientModelStore, HttpClientConnector) {

    return function(options) {
        if (!options.serverUrl) {
            throw new Error("Can't setup dolphin client without serverUrl property.");
        }

        this.serverUrl = options.serverUrl;

        this.clientDolphin = new ClientDolphin();
        this.clientDolphin.setClientModelStore(new ClientModelStore(this.clientDolphin));

        var connector = new HttpClientConnector(this.clientDolphin, this.serverUrl);
        this.clientDolphin.setClientConnector(connector);

        this.getClientDolphin = function() {
            return this.clientDolphin;
        };

        if (options.clearSession) {
            // TODO implement generically
            var expiredDate = new Date(new Date().getTime() - 1000).toUTCString();
            document.cookie = document.cookie + '; expires=' + expiredDate + '; path=/dolphinServer';
        }

        console.log("dolphin connected", this.serverUrl);
    };

});
