"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTypeIfScalar = convertTypeIfScalar;
exports.wrapWithTypeOptions = wrapWithTypeOptions;
exports.convertToType = convertToType;
exports.getEnumValuesMap = getEnumValuesMap;
const graphql_1 = require("graphql");
const errors_1 = require("../errors");
const scalars_1 = require("../scalars");
const build_context_1 = require("../schema/build-context");
function wrapTypeInNestedList(targetType, depth, nullable) {
    const targetTypeNonNull = nullable ? targetType : new graphql_1.GraphQLNonNull(targetType);
    if (depth === 0) {
        return targetType;
    }
    return wrapTypeInNestedList(new graphql_1.GraphQLList(targetTypeNonNull), depth - 1, nullable);
}
function convertTypeIfScalar(type) {
    if (type instanceof graphql_1.GraphQLScalarType) {
        return type;
    }
    const scalarMap = build_context_1.BuildContext.scalarsMaps.find(it => it.type === type);
    if (scalarMap) {
        return scalarMap.scalar;
    }
    switch (type) {
        case String:
            return graphql_1.GraphQLString;
        case Boolean:
            return graphql_1.GraphQLBoolean;
        case Number:
            return graphql_1.GraphQLFloat;
        case Date:
            return scalars_1.GraphQLISODateTime;
        default:
            return undefined;
    }
}
function wrapWithTypeOptions(target, propertyName, type, typeOptions, nullableByDefault) {
    if (!typeOptions.array &&
        (typeOptions.nullable === "items" || typeOptions.nullable === "itemsAndList")) {
        throw new errors_1.WrongNullableListOptionError(target.name, propertyName, typeOptions.nullable);
    }
    let gqlType = type;
    if (typeOptions.array) {
        const isNullableArray = typeOptions.nullable === "items" ||
            typeOptions.nullable === "itemsAndList" ||
            (typeOptions.nullable === undefined && nullableByDefault === true);
        gqlType = wrapTypeInNestedList(gqlType, typeOptions.arrayDepth, isNullableArray);
    }
    if (typeOptions.nullable === false ||
        (typeOptions.nullable === undefined && nullableByDefault === false) ||
        typeOptions.nullable === "items") {
        gqlType = new graphql_1.GraphQLNonNull(gqlType);
    }
    return gqlType;
}
const simpleTypes = [String, Boolean, Number, Date, Array, Promise];
function convertToType(Target, data) {
    if (data == null) {
        return data;
    }
    if (Target instanceof graphql_1.GraphQLScalarType) {
        return data;
    }
    if (simpleTypes.includes(data.constructor)) {
        return data;
    }
    if (data instanceof Target) {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(item => convertToType(Target, item));
    }
    return Object.assign(new Target(), data);
}
function getEnumValuesMap(enumObject) {
    const enumKeys = Object.keys(enumObject).filter(key => Number.isNaN(parseInt(key, 10)));
    const enumMap = enumKeys.reduce((map, key) => {
        map[key] = enumObject[key];
        return map;
    }, {});
    return enumMap;
}