define([
    'comm/Command'
], function (Command) {

    var ChangeAttributeMetadataCommand = function(attributeId, metadataName, value) {

        this.id = 'ChangeAttributeMetadata';
        this.className = "org.opendolphin.core.comm.ChangeAttributeMetadataCommand";

        this.attributeId = attributeId;
        this.metadataName = metadataName;
        this.value = value;

    };

    ChangeAttributeMetadataCommand.prototype = new Command();

    return ChangeAttributeMetadataCommand

});
