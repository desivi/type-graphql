import { type Middleware } from "../typings/Middleware.js";
import { type MethodAndPropDecorator } from "./types.js";
export declare function UseMiddleware(middlewares: Array<Middleware<any>>): MethodAndPropDecorator;
export declare function UseMiddleware(...middlewares: Array<Middleware<any>>): MethodAndPropDecorator;
