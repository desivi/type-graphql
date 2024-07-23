"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectType = ObjectType;
const decorators_1 = require("../helpers/decorators");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function ObjectType(nameOrOptions, maybeOptions) {
    const { name, options } = (0, decorators_1.getNameDecoratorParams)(nameOrOptions, maybeOptions);
    const interfaceClasses = options.implements && [].concat(options.implements);
    return target => {
        (0, getMetadataStorage_1.getMetadataStorage)().collectObjectMetadata({
            name: name || target.name,
            target,
            description: options.description,
            interfaceClasses,
            simpleResolvers: options.simpleResolvers,
        });
    };
}
