define([
    'comm/NamedCommand'
], function (NamedCommand) {

    return function() {

        this.getClientModelStore = function() {
            return this.clientModelStore;
        };

        this.setClientModelStore = function(clientModelStore) {
            this.clientModelStore = clientModelStore;
        };

        this.getClientConnector = function() {
            return this.clientConnector;
        };

        this.setClientConnector = function(clientConnector) {
            this.clientConnector = clientConnector;
        };

        this.send = function(commandName, onFinished) {
            this.clientConnector.send(new NamedCommand(commandName), onFinished);
        };

    };

});
