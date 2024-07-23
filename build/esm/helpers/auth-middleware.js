"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = AuthMiddleware;
const errors_1 = require("../errors");
function AuthMiddleware(authChecker, container, authMode, roles) {
    return async (action, next) => {
        let accessGranted;
        if (authChecker.prototype) {
            const authCheckerInstance = await container.getInstance(authChecker, action);
            accessGranted = await authCheckerInstance.check(action, roles);
        }
        else {
            accessGranted = await authChecker(action, roles);
        }
        if (!accessGranted) {
            if (authMode === "null") {
                return null;
            }
            if (authMode === "error") {
                throw roles.length === 0 ? new errors_1.AuthenticationError() : new errors_1.AuthorizationError();
            }
        }
        return next();
    };
}
