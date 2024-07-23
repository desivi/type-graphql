"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSchema = buildSchema;
exports.buildSchemaSync = buildSchemaSync;
const tslib_1 = require("tslib");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const schema_generator_1 = require("../schema/schema-generator");
const emitSchemaDefinitionFile_1 = require("./emitSchemaDefinitionFile");
function getEmitSchemaDefinitionFileOptions(buildSchemaOptions) {
    const defaultSchemaFilePath = node_path_1.default.resolve(process.cwd(), "schema.graphql");
    return {
        schemaFileName: typeof buildSchemaOptions.emitSchemaFile === "string"
            ? buildSchemaOptions.emitSchemaFile
            : typeof buildSchemaOptions.emitSchemaFile === "object"
                ? buildSchemaOptions.emitSchemaFile.path || defaultSchemaFilePath
                : defaultSchemaFilePath,
        printSchemaOptions: typeof buildSchemaOptions.emitSchemaFile === "object"
            ? { ...emitSchemaDefinitionFile_1.defaultPrintSchemaOptions, ...buildSchemaOptions.emitSchemaFile }
            : emitSchemaDefinitionFile_1.defaultPrintSchemaOptions,
    };
}
function loadResolvers(options) {
    if (options.resolvers.length === 0) {
        throw new Error("Empty `resolvers` array property found in `buildSchema` options!");
    }
    return options.resolvers;
}
async function buildSchema(options) {
    const resolvers = loadResolvers(options);
    const schema = schema_generator_1.SchemaGenerator.generateFromMetadata({ ...options, resolvers });
    if (options.emitSchemaFile) {
        const { schemaFileName, printSchemaOptions } = getEmitSchemaDefinitionFileOptions(options);
        await (0, emitSchemaDefinitionFile_1.emitSchemaDefinitionFile)(schemaFileName, schema, printSchemaOptions);
    }
    return schema;
}
function buildSchemaSync(options) {
    const resolvers = loadResolvers(options);
    const schema = schema_generator_1.SchemaGenerator.generateFromMetadata({ ...options, resolvers });
    if (options.emitSchemaFile) {
        const { schemaFileName, printSchemaOptions } = getEmitSchemaDefinitionFileOptions(options);
        (0, emitSchemaDefinitionFile_1.emitSchemaDefinitionFileSync)(schemaFileName, schema, printSchemaOptions);
    }
    return schema;
}