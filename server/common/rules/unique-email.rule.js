"use strict";
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var entity_1 = require("../../entity");
function uniqueEmail(data, field, message, args, get) {
    return new Promise(function (resolve, reject) {
        var email = get(data, field);
        typeorm_1.getRepository(entity_1.User)
            .findOne({ where: { email: email } })
            .then(function (u) {
            return u ? reject("Email address already exists.") : resolve();
        }, function (e) {
            reject(e.message);
        });
    });
}
exports.uniqueEmail = uniqueEmail;
//# sourceMappingURL=unique-email.rule.js.map