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
exports.RepeatAction = void 0;
const BaseAction_1 = require("./BaseAction");
class RepeatAction extends BaseAction_1.BaseAction {
    constructor(options) {
        super(options);
    }
    do(client, message, emitter) {
        return __awaiter(this, void 0, void 0, function* () {
            let _m;
            if (!(_m = this.options.get("macro"))) {
                throw new Error("Repeat action needs 'macro' option!");
            }
            let _t;
            if (!(_t = this.options.get("times"))) {
                throw new Error("Repeat action needs 'times' option!");
            }
            const _c = Number.parseInt(_t);
            if (Number.isNaN(_c)) {
                return;
            }
            for (let i = 0; i < _c; i++) {
                emitter.emit("macro", _m, message);
            }
        });
    }
}
exports.RepeatAction = RepeatAction;
