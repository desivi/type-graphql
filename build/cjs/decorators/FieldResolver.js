"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldResolver = FieldResolver;
const errors_1 = require("../errors");
const decorators_1 = require("../helpers/decorators");
const findType_1 = require("../helpers/findType");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function FieldResolver(returnTypeFuncOrOptions, maybeOptions) {
    return (prototype, propertyKey) => {
        if (typeof propertyKey === "symbol") {
            throw new errors_1.SymbolKeysNotSupportedError();
        }
        let getType;
        let typeOptions;
        const { options, returnTypeFunc } = (0, decorators_1.getTypeDecoratorParams)(returnTypeFuncOrOptions, maybeOptions);
        try {
            const typeInfo = (0, findType_1.findType)({
                metadataKey: "design:returntype",
                prototype,
                propertyKey,
                returnTypeFunc,
                typeOptions: options,
            });
            typeOptions = typeInfo.typeOptions;
            getType = typeInfo.getType;
        }
        catch {
        }
        (0, getMetadataStorage_1.getMetadataStorage)().collectFieldResolverMetadata({
            kind: "external",
            methodName: propertyKey,
            schemaName: options.name || propertyKey,
            target: prototype.constructor,
            getType,
            typeOptions,
            complexity: options.complexity,
            description: options.description,
            deprecationReason: options.deprecationReason,
        });
    };
}