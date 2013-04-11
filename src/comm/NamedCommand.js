define([
    'comm/Command'
], function (Command) {

    var NamedCommand = function(name) {

        this.id = name;

    };

    NamedCommand.prototype = new Command();

    return NamedCommand

});
