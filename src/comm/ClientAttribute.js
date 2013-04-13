define([
    'comm/EventBus'
], function(EventBus) {

    function ClientAttribute(propertyName) {
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
        };

        this.syncWith = function(sourceAttribute) {
            if (sourceAttribute) {
                this.baseValue = sourceAttribute.baseValue;
                this.qualifier = sourceAttribute.qualifier;
                this.setValue(sourceAttribute.getValue());
            }
        }
    }

    ClientAttribute.prototype = new EventBus();

    ClientAttribute.nextId = (function() {
        var id = 0;
        return function() {
            return id++;
        }
    })();

    return ClientAttribute;

});
