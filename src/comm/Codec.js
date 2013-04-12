define(function () {

    return function() {

        this.encode = function(commands) {
            return JSON.stringify(commands);
        };

        this.decode = function(transmitted) {
            return JSON.parse(transmitted);
        };

    };

});
