define(function () {

    function EventBus() {

        this.subscribers = {};

        this.on = function(type, subscriber) {
            if (!type || typeof type != 'string') {
                throw new Error("Argument type must be a string");
            }
            if (typeof subscriber != 'function') {
                throw new Error("Argument subscriber must be a function");
            }
            var subs = this.subscribers[type];
            if (!subs) {
                this.subscribers[type] = [];
                subs = this.subscribers[type];
            }
            if (subs.indexOf(subscriber) === -1) {
                subs.push(subscriber);
                console.log("added subscriber", type, subscriber);
            }
        };

        this.trigger = function(type, data) {
            var subs = this.subscribers[type];
            if (subs) {
                subs.forEach(function(sub) {
                    console.log("trigger", type, data, sub);
                    sub(data);
                })
            }
        }

    }

    return EventBus;

});
