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
            var me = this;
            var oldValue = this.value;
            if (oldValue !== value) {
                this.value = value;
                this.trigger("valueChange", {
                    source: me,
                    newValue: value,
                    oldValue: oldValue
                });
            }
        };

        this.getValue = function() {
            return this.value;
        };

        this.setQualifier = function(value) {
            var me = this;
            var oldQualifier = this.qualifier;
            if (oldQualifier !== value) {
                this.qualifier = value;
                this.trigger("qualifierChange", {
                    source: me,
                    newQualifier: value,
                    oldQualifier: oldQualifier
                });
            }
        };

        this.syncWith = function(sourceAttribute) {
            if (sourceAttribute) {
                this.baseValue = sourceAttribute.baseValue; // TODO use setter, update dirty, fire events
                this.setQualifier(sourceAttribute.qualifier);
                this.setValue(sourceAttribute.getValue());
            }
        };
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
