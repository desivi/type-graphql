"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = Args;
const decorators_1 = require("../helpers/decorators");
const params_1 = require("../helpers/params");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function Args(paramTypeFnOrOptions, maybeOptions) {
    const { options, returnTypeFunc } = (0, decorators_1.getTypeDecoratorParams)(paramTypeFnOrOptions, maybeOptions);
    return (prototype, propertyKey, parameterIndex) => {
        (0, getMetadataStorage_1.getMetadataStorage)().collectHandlerParamMetadata({
            kind: "args",
            ...(0, params_1.getParamInfo)({ prototype, propertyKey, parameterIndex, returnTypeFunc, options }),
        });
    };
}