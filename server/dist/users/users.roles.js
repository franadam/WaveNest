"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.UserRole = void 0;
const nest_access_control_1 = require("nest-access-control");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["USER"] = "USER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles
    .grant(UserRole.USER)
    .readOwn('profile')
    .updateOwn('profile')
    .readAny('brands')
    .readAny('guitars')
    .readAny('transactions')
    .createAny('transactions')
    .grant(UserRole.ADMIN)
    .extend(UserRole.USER)
    .createAny('profile')
    .updateAny('profile')
    .deleteAny('profile')
    .createAny('brands')
    .updateAny('brands')
    .deleteAny('brands')
    .createAny('guitars')
    .updateAny('guitars')
    .deleteAny('guitars')
    .deleteAny('transactions')
    .readAny('sites')
    .createAny('sites')
    .updateAny('sites')
    .deleteAny('sites');
//# sourceMappingURL=users.roles.js.map