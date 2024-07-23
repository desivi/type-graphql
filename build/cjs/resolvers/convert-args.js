"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertArgsToInstance = convertArgsToInstance;
exports.convertArgToInstance = convertArgToInstance;
const types_1 = require("../helpers/types");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
const generatedTrees = new Map();
function getInputType(target) {
    return (0, getMetadataStorage_1.getMetadataStorage)().inputTypes.find(t => t.target === target);
}
function getArgsType(target) {
    return (0, getMetadataStorage_1.getMetadataStorage)().argumentTypes.find(t => t.target === target);
}
function generateInstanceTransformationTree(target) {
    if (generatedTrees.has(target)) {
        return generatedTrees.get(target);
    }
    const inputType = getInputType(target);
    if (!inputType) {
        generatedTrees.set(target, null);
        return null;
    }
    function generateTransformationTree(metadata) {
        let inputFields = metadata.fields;
        let superClass = Object.getPrototypeOf(metadata.target);
        while (superClass.prototype !== undefined) {
            const superInputType = getInputType(superClass);
            if (superInputType) {
                const existingFieldNames = new Set(inputFields.map(field => field.name));
                const superFields = superInputType.fields.filter(field => !existingFieldNames.has(field.name));
                inputFields = [...inputFields, ...superFields];
                superClass = Object.getPrototypeOf(superClass);
            }
            else {
                break;
            }
        }
        const transformationTree = {
            target: metadata.target,
            getFields: () => inputFields.map(field => {
                const fieldTarget = field.getType();
                const fieldInputType = getInputType(fieldTarget);
                return {
                    name: field.name,
                    target: fieldTarget,
                    fields: fieldTarget === metadata.target
                        ? transformationTree
                        : fieldInputType && generateTransformationTree(fieldInputType),
                };
            }),
        };
        return transformationTree;
    }
    const generatedTransformationTree = generateTransformationTree(inputType);
    generatedTrees.set(target, generatedTransformationTree);
    return generatedTransformationTree;
}
function convertToInput(tree, data) {
    if (data == null) {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(it => convertToInput(tree, it));
    }
    const inputFields = tree.getFields().reduce((fields, field) => {
        const siblings = field.fields;
        const value = data[field.name];
        if (value !== undefined) {
            if (value === null || !siblings) {
                fields[field.name] = (0, types_1.convertToType)(field.target, value);
            }
            else if (Array.isArray(value)) {
                fields[field.name] = value.map(itemValue => convertToInput(siblings, itemValue));
            }
            else {
                fields[field.name] = convertToInput(siblings, value);
            }
        }
        return fields;
    }, {});
    return (0, types_1.convertToType)(tree.target, inputFields);
}
function convertValueToInstance(target, value) {
    const transformationTree = generateInstanceTransformationTree(target);
    return transformationTree
        ? convertToInput(transformationTree, value)
        : (0, types_1.convertToType)(target, value);
}
function convertValuesToInstances(target, value) {
    if (value == null) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(itemValue => convertValuesToInstances(target, itemValue));
    }
    return convertValueToInstance(target, value);
}
function convertArgsToInstance(argsMetadata, args) {
    const ArgsClass = argsMetadata.getType();
    const argsType = getArgsType(ArgsClass);
    let argsFields = argsType.fields;
    let superClass = Object.getPrototypeOf(argsType.target);
    while (superClass.prototype !== undefined) {
        const superArgumentType = getArgsType(superClass);
        if (superArgumentType) {
            argsFields = [...argsFields, ...superArgumentType.fields];
        }
        superClass = Object.getPrototypeOf(superClass);
    }
    const transformedFields = argsFields.reduce((fields, field) => {
        const fieldValue = args[field.name];
        if (fieldValue !== undefined) {
            const fieldTarget = field.getType();
            fields[field.name] = convertValuesToInstances(fieldTarget, fieldValue);
        }
        return fields;
    }, {});
    return (0, types_1.convertToType)(ArgsClass, transformedFields);
}
function convertArgToInstance(argMetadata, args) {
    const argValue = args[argMetadata.name];
    const argTarget = argMetadata.getType();
    return convertValuesToInstances(argTarget, argValue);
}