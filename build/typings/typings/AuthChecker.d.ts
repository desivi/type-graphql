import { type ResolverData } from "./ResolverData.js";
import { type ClassType } from "./utils/index.js";
export type AuthCheckerFn<TContextType extends object = object, TRoleType = string> = (resolverData: ResolverData<TContextType>, roles: TRoleType[]) => boolean | Promise<boolean>;
export interface AuthCheckerInterface<TContextType extends object = object, TRoleType = string> {
    check(resolverData: ResolverData<TContextType>, roles: TRoleType[]): boolean | Promise<boolean>;
}
export type AuthChecker<TContextType extends object = object, TRoleType = string> = AuthCheckerFn<TContextType, TRoleType> | ClassType<AuthCheckerInterface<TContextType, TRoleType>>;
export type AuthMode = "error" | "null";