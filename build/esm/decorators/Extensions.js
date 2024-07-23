"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extensions = Extensions;
const errors_1 = require("../errors");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function Extensions(extensions) {
    return (targetOrPrototype, propertyKey, _descriptor) => {
        if (typeof propertyKey === "symbol") {
            throw new errors_1.SymbolKeysNotSupportedError();
        }
        if (propertyKey) {
            (0, getMetadataStorage_1.getMetadataStorage)().collectExtensionsFieldMetadata({
                target: targetOrPrototype.constructor,
                fieldName: propertyKey,
                extensions,
            });
        }
        else {
            (0, getMetadataStorage_1.getMetadataStorage)().collectExtensionsClassMetadata({
                target: targetOrPrototype,
                extensions,
            });
        }
    };
}
