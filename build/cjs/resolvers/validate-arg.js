"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    const { validateOrReject } = await Promise.resolve().then(() => __importStar(require("class-validator")));
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
