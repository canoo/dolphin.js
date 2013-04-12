define([
    'comm/EventBus'
], function(EventBus) {

    function ClientAttribute(propertyName) {

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
//                console.log("added subscriber", type, subscriber);
            }
        };

        this.trigger = function(type, data) {
            var subs = this.subscribers[type];
            if (subs) {
                subs.forEach(function(sub) {
//                    console.log("trigger", type, data, sub);
                    sub(data);
                })
            }
        };


        this.id = ClientAttribute.nextId();
        this.propertyName = propertyName;
        this.baseValue = undefined;
        this.qualifier = undefined;
        this.tag = "VALUE";

        this.value = undefined;

        this.setValue = function(value) {
            var oldValue = this.value;
            if (oldValue !== value) {
                this.value = value;
                this.trigger("valueChange", {
                    newValue: value,
                    oldValue: oldValue
                });
            }
        };

        this.getValue = function() {
            return this.value;
        }
    }

    ClientAttribute.nextId = (function() {
        var id = 0;
        return function() {
            return id++;
        }
    })();

    return ClientAttribute;

});
