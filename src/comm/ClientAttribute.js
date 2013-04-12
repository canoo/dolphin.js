define([
    'comm/Utils'
], function(Utils) {

    var SUPPORTED_VALUE_TYPES = [ 'string', 'number', 'boolean', 'date' ];

    /**
     * Check whether value is of allowed type and convert to an allowed type if possible.
     */
    function checkValue(value) {
        if (!value) return undefined;
        var result = value;
        // check for ClientAttribute instances
        if (result instanceof ClientAttribute) {
            console.log("An Attribute may not itself contain an attribute as a value. Assuming you forgot to call getValue().");
            result = this.checkValue(value.getValue());
        }
        var ok = false;
        SUPPORTED_VALUE_TYPES.forEach(function(type) {
            if (typeof value === type) {
                ok = true;
            }
        });
        if (!ok) {
            throw new Error("Attribute values of this type are not allowed: " + (typeof value));
        }
        return result;
    }

    function ClientAttribute(propertyName, baseValue, qualifier, tag) {
        this.propertyName = propertyName;
        this.value = undefined;
        this.baseValue = baseValue;
        this.dirty = false;
        this.tag = tag || "VALUE";

        this.id = Utils.hashCode(this); // todo: dk: has to change to tell client from server
        this.qualifier = qualifier; // application specific semantics apply


        this.isDirty = function() {
            return dirty;
        };

        this.getBaseValue = function() {
            return baseValue;
        };

        this.getValue = function() {
            return value;
        };

        this.getTag = function() {
            return tag;
        };

        // todo dk: think about specific method versions for each allowed type
        this.setValue = function(value) {
            value = checkValue(value);
            this.setDirty(!baseValue ? !value : baseValue !== value);
            this.firePropertyChange("value", this.value, this.value = value);
        };

        this.setDirty = function(dirty) {
            this.firePropertyChange("dirty", this.dirty, this.dirty = dirty);
        };

        this.setBaseValue = function(baseValue) {
            this.setDirty(!baseValue ? !value : baseValue !== value);
            this.firePropertyChange("baseValue", this.baseValue, this.baseValue = baseValue);
        };

        this.rebase = function() {
            this.setBaseValue(this.getValue());
        };

        this.reset = function() {
            this.setValue(this.getBaseValue());
            this.setDirty(false);
        };

        this.getPropertyName = function() {
            return this.propertyName;
        };

        this.getId = function() {
            return this.id;
        };

        this.setId = function(id) {
            this.id = id;
        };

        this.getQualifier = function() {
            return this.qualifier;
        };

        this.setQualifier = function(qualifier) {
            this.firePropertyChange("qualifier", this.qualifier, this.qualifier = qualifier);
        };

        this.syncWith = function(source) {
            if (this === source || !source) {
                return;
            }
            this.setBaseValue(source.getBaseValue());
            this.setQualifier(source.getQualifier());
            this.setValue(source.getValue());
        }

    }

    return ClientAttribute;

});
