define(function () {

    return function(clientDolphin) {

        this.clientDolphin = clientDolphin;

        this.getClientDolphin = function() {
            return this.clientDolphin;
        }

    };

});

