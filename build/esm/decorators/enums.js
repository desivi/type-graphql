"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEnumType = registerEnumType;
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function registerEnumType(enumObj, enumConfig) {
    (0, getMetadataStorage_1.getMetadataStorage)().collectEnumMetadata({
        enumObj,
        name: enumConfig.name,
        description: enumConfig.description,
        valuesConfig: enumConfig.valuesConfig || {},
    });
}