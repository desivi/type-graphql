"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArg = validateArg;
const errors_1 = require("../errors");
const shouldArgBeValidated = (argValue) => argValue !== null && typeof argValue === "object";
async function validateArg(argValue, argType, resolverData, globalValidate, argValidate, validateFn) {
    if (typeof validateFn === "function") {
        await validateFn(argValue, argType, resolverData);
        return argValue;
    }
    const validate = argValidate !== undefined ? argValidate : globalValidate;
    if (validate === false || !shouldArgBeValidated(argValue)) {
        return argValue;
    }
    const validatorOptions = {
        ...(typeof globalValidate === "object" ? globalValidate : {}),
        ...(typeof argValidate === "object" ? argValidate : {}),
    };
    if (validatorOptions.skipMissingProperties !== false) {
        validatorOptions.skipMissingProperties = true;
    }
    if (validatorOptions.forbidUnknownValues !== true) {
        validatorOptions.forbidUnknownValues = false;
    }
    const { validateOrReject } = await import("class-validator");
    try {
        if (Array.isArray(argValue)) {
            await Promise.all(argValue
                .filter(shouldArgBeValidated)
                .map(argItem => validateOrReject(argItem, validatorOptions)));
        }
        else {
            await validateOrReject(argValue, validatorOptions);
        }
        return argValue;
    }
    catch (err) {
        throw new errors_1.ArgumentValidationError(err);
    }
}
