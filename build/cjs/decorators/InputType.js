"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputType = InputType;
const decorators_1 = require("../helpers/decorators");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function InputType(nameOrOptions, maybeOptions) {
    const { name, options } = (0, decorators_1.getNameDecoratorParams)(nameOrOptions, maybeOptions);
    return target => {
        (0, getMetadataStorage_1.getMetadataStorage)().collectInputMetadata({
            name: name || target.name,
            target,
            description: options.description,
        });
    };
}
