define(function () {

    return function() {

        this.setClientModelStore = function(clientModelStore) {
            this.clientModelStore = clientModelStore;
        };

        this.setClientConnector = function(clientConnector) {
            this.clientConnector = clientConnector;
        }

    };

});
