"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findType = findType;
const errors_1 = require("../errors");
const returnTypes_1 = require("./returnTypes");
function findTypeValueArrayDepth([typeValueOrArray], innerDepth = 1) {
    if (!Array.isArray(typeValueOrArray)) {
        return { depth: innerDepth, returnType: typeValueOrArray };
    }
    return findTypeValueArrayDepth(typeValueOrArray, innerDepth + 1);
}
function findType({ metadataKey, prototype, propertyKey, parameterIndex, argName, returnTypeFunc, typeOptions = {}, }) {
    const options = { ...typeOptions };
    let metadataDesignType;
    const reflectedType = Reflect.getMetadata(metadataKey, prototype, propertyKey);
    if (reflectedType) {
        if (metadataKey === "design:paramtypes") {
            metadataDesignType = reflectedType[parameterIndex];
        }
        else {
            metadataDesignType = reflectedType;
        }
    }
    if (!returnTypeFunc && (!metadataDesignType || returnTypes_1.bannedTypes.includes(metadataDesignType))) {
        throw new errors_1.NoExplicitTypeError(prototype.constructor.name, propertyKey, parameterIndex, argName);
    }
    if (returnTypeFunc) {
        const getType = () => {
            const returnTypeFuncReturnValue = returnTypeFunc();
            if (Array.isArray(returnTypeFuncReturnValue)) {
                const { depth, returnType } = findTypeValueArrayDepth(returnTypeFuncReturnValue);
                options.array = true;
                options.arrayDepth = depth;
                return returnType;
            }
            return returnTypeFuncReturnValue;
        };
        return {
            getType,
            typeOptions: options,
        };
    }
    if (metadataDesignType) {
        return {
            getType: () => metadataDesignType,
            typeOptions: options,
        };
    }
    throw new Error("Ops... this should never happen :)");
}
