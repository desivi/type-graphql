import { type SchemaGeneratorOptions } from "../schema/schema-generator.js";
import { type AuthorizedMetadata, type ClassMetadata, type EnumMetadata, type ExtensionsClassMetadata, type ExtensionsFieldMetadata, type FieldMetadata, type FieldResolverMetadata, type MiddlewareMetadata, type ParamMetadata, type ResolverClassMetadata, type ResolverMetadata, type SubscriptionResolverMetadata, type UnionMetadata, type UnionMetadataWithSymbol } from "./definitions/index.js";
import { type DirectiveClassMetadata, type DirectiveFieldMetadata } from "./definitions/directive-metadata.js";
import { type InterfaceClassMetadata } from "./definitions/interface-class-metadata.js";
import { type ObjectClassMetadata } from "./definitions/object-class-metadata.js";
export declare class MetadataStorage {
    queries: ResolverMetadata[];
    mutations: ResolverMetadata[];
    subscriptions: SubscriptionResolverMetadata[];
    fieldResolvers: FieldResolverMetadata[];
    objectTypes: ObjectClassMetadata[];
    inputTypes: ClassMetadata[];
    argumentTypes: ClassMetadata[];
    interfaceTypes: InterfaceClassMetadata[];
    authorizedFields: AuthorizedMetadata[];
    enums: EnumMetadata[];
    unions: UnionMetadataWithSymbol[];
    middlewares: MiddlewareMetadata[];
    classDirectives: DirectiveClassMetadata[];
    fieldDirectives: DirectiveFieldMetadata[];
    classExtensions: ExtensionsClassMetadata[];
    fieldExtensions: ExtensionsFieldMetadata[];
    resolverClasses: ResolverClassMetadata[];
    fields: FieldMetadata[];
    params: ParamMetadata[];
    constructor();
    collectQueryHandlerMetadata(definition: ResolverMetadata): void;
    collectMutationHandlerMetadata(definition: ResolverMetadata): void;
    collectSubscriptionHandlerMetadata(definition: SubscriptionResolverMetadata): void;
    collectFieldResolverMetadata(definition: FieldResolverMetadata): void;
    collectObjectMetadata(definition: ObjectClassMetadata): void;
    collectInputMetadata(definition: ClassMetadata): void;
    collectArgsMetadata(definition: ClassMetadata): void;
    collectInterfaceMetadata(definition: InterfaceClassMetadata): void;
    collectAuthorizedFieldMetadata(definition: AuthorizedMetadata): void;
    collectEnumMetadata(definition: EnumMetadata): void;
    collectUnionMetadata(definition: UnionMetadata): symbol;
    collectMiddlewareMetadata(definition: MiddlewareMetadata): void;
    collectResolverClassMetadata(definition: ResolverClassMetadata): void;
    collectClassFieldMetadata(definition: FieldMetadata): void;
    collectHandlerParamMetadata(definition: ParamMetadata): void;
    collectDirectiveClassMetadata(definition: DirectiveClassMetadata): void;
    collectDirectiveFieldMetadata(definition: DirectiveFieldMetadata): void;
    collectExtensionsClassMetadata(definition: ExtensionsClassMetadata): void;
    collectExtensionsFieldMetadata(definition: ExtensionsFieldMetadata): void;
    build(options: SchemaGeneratorOptions): void;
    clear(): void;
    private buildClassMetadata;
    private buildResolversMetadata;
    private buildFieldResolverMetadata;
    private buildExtendedResolversMetadata;
    private findFieldRoles;
    private findExtensions;
}
