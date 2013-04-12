define([
    'comm/Observable'
], function(Observable) {

    function ClientAttribute(propertyName) {

        this.id = ClientAttribute.nextId();
        this.propertyName = propertyName;
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

    ClientAttribute.prototype = new Observable();

    ClientAttribute.nextId = (function() {
        var id = 0;
        return function() {
            return id++;
        }
    })();

    return ClientAttribute;

});
