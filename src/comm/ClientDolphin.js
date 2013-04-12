define([
    'comm/NamedCommand',
    'comm/PresentationModel'
], function (NamedCommand, PresentationModel) {

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

        /**
         * Create and init a new presentation model
         *
         * @param id nullable or session unique value
         * @param type nullable
         */
        this.presentationModel = function(id, type) {
            var model = new PresentationModel(id);
            model.presentationModelType = type;

            if (arguments.length > 2) {
                for (var i = 2; i < arguments.length; i++) {
                    model.addAttribute(arguments[i]);
                }
            }

            this.clientModelStore.add(model);
        }

    };

});
