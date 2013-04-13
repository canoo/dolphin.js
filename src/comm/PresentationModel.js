define(function () {

    function PresentationModel(id, type) {

        this.id = id || PresentationModel.nextId();
        this.presentationModelType = type;

        this.attributes = [];

        this.addAttribute = function(attribute) {
            this.attributes.push(attribute);
        };

        this.getAttributeByPropertyName = function(propertyName) {
            if (!propertyName) {
                return undefined;
            }
            var matches = this.attributes.filter(function(attr) {
                return attr.propertyName == propertyName;
            });
            return matches.shift();
        };

        this.syncWith = function(sourceModel) {
            this.attributes.forEach(function(targetAttribute) {
                var sourceAttribute = sourceModel.getAttributeByPropertyName(targetAttribute.propertyName);
                if (sourceAttribute) {
                    targetAttribute.syncWith(sourceAttribute);
                }
            })
        };

    }

    PresentationModel.nextId = (function() {
        var id = 0;
        return function() {
            return id++;
        }
    })();

    return PresentationModel;

});
