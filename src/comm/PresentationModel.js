define(function () {

    return function(id, type) {

        this.id = id;
        this.presentationModelType = type;

        this.attributes = [];

        this.addAttribute = function(attribute) {
            this.attributes.push(attribute);
        }

    };

});
