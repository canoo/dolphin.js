define([
    'comm/Command'
], function (Command) {

    var EmptyNotification = function() {

        this.id = 'Empty';
        this.className = "org.opendolphin.core.comm.EmptyNotification";

    };

    EmptyNotification.prototype = new Command();

    return EmptyNotification

});
