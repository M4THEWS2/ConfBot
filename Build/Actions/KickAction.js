"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KickAction = void 0;
const BaseAction_1 = require("./BaseAction");
class KickAction extends BaseAction_1.BaseAction {
    constructor(options) {
        super(options);
    }
    do(client, message, emitter) {
        var _a, _b, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const _m = this.options.get("member");
            if (!_m) {
                throw new Error("kick action requires 'member' option.");
            }
            let method = "kick", _s;
            if (this.options.has("ban")) {
                method = "ban";
            }
            if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(method == "kick" ? "KickMembers" : "BanMembers"))) {
                if ((_s = this.options.get("missing-permissions"))) {
                    emitter.emit("macro", _s, message);
                    return;
                }
            }
            let member, _c;
            if (_m == "user" && message.member) {
                member = message.member;
            }
            else if (_m.startsWith("mention-")) {
                _s = _m.split("-");
                if (_s.length < 2 || Number.isNaN((_c = Number.parseInt(_s[1])))) {
                    throw new Error("kick action has invalid 'member' option.");
                }
                member = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.at(_c - 1);
                if (!member) {
                    if ((_s = this.options.get("member-not-found"))) {
                        emitter.emit("macro", _s, message);
                    }
                    return;
                }
            }
            else {
                yield ((_d = message.guild) === null || _d === void 0 ? void 0 : _d.members.fetch(_m).then((m) => {
                    member = m;
                }).catch(() => {
                    throw new Error("kick action has invalid 'member' option.");
                }));
            }
            try {
                yield member[method]();
                if ((_s = this.options.get("success"))) {
                    emitter.emit("macro", _s, message);
                }
            }
            catch (err) {
                if ((err === null || err === void 0 ? void 0 : err.code) === 50013 && (_s = this.options.get("missing-permissions"))) {
                    emitter.emit("macro", _s, message);
                }
            }
        });
    }
}
exports.KickAction = KickAction;
