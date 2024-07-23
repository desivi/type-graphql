"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = Subscription;
const errors_1 = require("../errors");
const decorators_1 = require("../helpers/decorators");
const resolver_metadata_1 = require("../helpers/resolver-metadata");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function Subscription(returnTypeFuncOrOptions, maybeOptions) {
    const params = (0, decorators_1.getTypeDecoratorParams)(returnTypeFuncOrOptions, maybeOptions);
    const options = params.options;
    return (prototype, methodName) => {
        const metadata = (0, resolver_metadata_1.getResolverMetadata)(prototype, methodName, params.returnTypeFunc, options);
        if (Array.isArray(options.topics) && options.topics.length === 0) {
            throw new errors_1.MissingSubscriptionTopicsError(metadata.target, metadata.methodName);
        }
        (0, getMetadataStorage_1.getMetadataStorage)().collectSubscriptionHandlerMetadata({
            ...metadata,
            topics: options.topics,
            filter: options.filter,
            subscribe: options.subscribe,
        });
    };
}
