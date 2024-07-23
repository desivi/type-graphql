"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = Root;
const errors_1 = require("../errors");
const findType_1 = require("../helpers/findType");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function Root(propertyName) {
    return (prototype, propertyKey, parameterIndex) => {
        if (typeof propertyKey === "symbol") {
            throw new errors_1.SymbolKeysNotSupportedError();
        }
        let getType;
        try {
            const typeInfo = (0, findType_1.findType)({
                metadataKey: "design:paramtypes",
                prototype,
                propertyKey,
                parameterIndex,
            });
            getType = typeInfo.getType;
        }
        catch {
        }
        (0, getMetadataStorage_1.getMetadataStorage)().collectHandlerParamMetadata({
            kind: "root",
            target: prototype.constructor,
            methodName: propertyKey,
            index: parameterIndex,
            propertyName,
            getType,
        });
    };
}