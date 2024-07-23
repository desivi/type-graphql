"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arg = Arg;
const decorators_1 = require("../helpers/decorators");
const params_1 = require("../helpers/params");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function Arg(name, returnTypeFuncOrOptions, maybeOptions) {
    return (prototype, propertyKey, parameterIndex) => {
        const { options, returnTypeFunc } = (0, decorators_1.getTypeDecoratorParams)(returnTypeFuncOrOptions, maybeOptions);
        (0, getMetadataStorage_1.getMetadataStorage)().collectHandlerParamMetadata({
            kind: "arg",
            name,
            description: options.description,
            deprecationReason: options.deprecationReason,
            ...(0, params_1.getParamInfo)({
                prototype,
                propertyKey,
                parameterIndex,
                returnTypeFunc,
                options,
                argName: name,
            }),
        });
    };
}
