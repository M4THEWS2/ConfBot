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
exports.Executable = void 0;
class Executable {
    constructor(name, actions, options, macro = false) {
        this.name = name;
        this.actions = actions;
        this.macro = macro;
    }
    execute(client, message, emitter) {
        return __awaiter(this, void 0, void 0, function* () {
            let date = new Date();
            try {
                for (let action of this.actions) {
                    yield action.do(client, message, emitter);
                }
                return {
                    successful: true,
                    text: `${message.author.username} (${message.author.id}) executed '${this.name}'${this.macro ? " (macro)" : ""} --> ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`,
                };
            }
            catch (err) {
                return {
                    successful: true,
                    text: `${message.author.username} (${message.author.id}) executed ${this.name}${this.macro ? " (macro)" : ""} and got error ${err} --> ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`,
                };
            }
        });
    }
}
exports.Executable = Executable;
