"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPrintSchemaOptions = void 0;
exports.emitSchemaDefinitionFileSync = emitSchemaDefinitionFileSync;
exports.emitSchemaDefinitionFile = emitSchemaDefinitionFile;
const graphql_1 = require("graphql");
const filesystem_1 = require("../helpers/filesystem");
exports.defaultPrintSchemaOptions = {
    sortedSchema: true,
};
const generatedSchemaWarning = `\
# -----------------------------------------------
# !!! THIS FILE WAS GENERATED BY TYPE-GRAPHQL !!!
# !!!   DO NOT MODIFY THIS FILE BY YOURSELF   !!!
# -----------------------------------------------

`;
function getSchemaFileContent(schema, options) {
    const schemaToEmit = options.sortedSchema ? (0, graphql_1.lexicographicSortSchema)(schema) : schema;
    return generatedSchemaWarning + (0, graphql_1.printSchema)(schemaToEmit);
}
function emitSchemaDefinitionFileSync(schemaFilePath, schema, options = exports.defaultPrintSchemaOptions) {
    const schemaFileContent = getSchemaFileContent(schema, options);
    (0, filesystem_1.outputFileSync)(schemaFilePath, schemaFileContent);
}
async function emitSchemaDefinitionFile(schemaFilePath, schema, options = exports.defaultPrintSchemaOptions) {
    const schemaFileContent = getSchemaFileContent(schema, options);
    await (0, filesystem_1.outputFile)(schemaFilePath, schemaFileContent);
}
