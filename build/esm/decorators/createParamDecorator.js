"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParamDecorator = createParamDecorator;
const errors_1 = require("../errors");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function createParamDecorator(resolver) {
    return (prototype, propertyKey, parameterIndex) => {
        if (typeof propertyKey === "symbol") {
            throw new errors_1.SymbolKeysNotSupportedError();
        }
        (0, getMetadataStorage_1.getMetadataStorage)().collectHandlerParamMetadata({
            kind: "custom",
            target: prototype.constructor,
            methodName: propertyKey,
            index: parameterIndex,
            resolver,
        });
    };
}
