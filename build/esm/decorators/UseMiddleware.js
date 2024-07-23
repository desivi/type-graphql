"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseMiddleware = UseMiddleware;
const errors_1 = require("../errors");
const decorators_1 = require("../helpers/decorators");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function UseMiddleware(...middlewaresOrMiddlewareArray) {
    const middlewares = (0, decorators_1.getArrayFromOverloadedRest)(middlewaresOrMiddlewareArray);
    return (prototype, propertyKey, _descriptor) => {
        if (typeof propertyKey === "symbol") {
            throw new errors_1.SymbolKeysNotSupportedError();
        }
        (0, getMetadataStorage_1.getMetadataStorage)().collectMiddlewareMetadata({
            target: prototype.constructor,
            fieldName: propertyKey,
            middlewares,
        });
    };
}
