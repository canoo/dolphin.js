define([
    'comm/CreatePresentationModelCommand',
    'comm/ValueChangedCommand'
], function(CreatePresentationModelCommand, ValueChangedCommand) {

    return function(clientDolphin) {

        this.clientDolphin = clientDolphin;

        this.models = [];

        this.getClientDolphin = function() {
            return this.clientDolphin;
        };

        this.registerModel = function(model) {
            var connector = this.clientDolphin.getClientConnector();

            var createCmd = new CreatePresentationModelCommand(model);
            console.log("about to send create pm", createCmd);
            connector.send(createCmd);

            model.attributes.forEach(function(attr) {
                attr.on("valueChange", function(data) {
                    var cmd = new ValueChangedCommand(attr.id, data.oldValue, data.newValue);
                    console.log("about to send value changed", cmd);
                    connector.send(cmd);

                });
            })
        };

        this.add = function(model) {
            // TODO check if model exists already
            this.models.push(model);

            // TODO bind client connector to PM attributes
            this.registerModel(model);

            console.log("model added and registerd");
        }

    };

});

