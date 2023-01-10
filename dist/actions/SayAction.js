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
exports.SayAction = void 0;
const BaseAction_1 = require("../BaseAction");
class SayAction extends BaseAction_1.default {
    do(inter, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield inter.reply({
                content: this.options.content ? `${this.options.reply != null ? `<@${inter.user.id}>, ` : ''}${this.options.content}` : undefined
            });
        });
    }
}
exports.SayAction = SayAction;
exports.default = SayAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2F5QWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvU2F5QWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDhDQUFzQztBQUV0QyxNQUFhLFNBQVUsU0FBUSxvQkFBVTtJQUNqQyxFQUFFLENBQUUsS0FBa0MsRUFBRSxNQUFjOztZQUMxRCxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDbEksQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUFBO0NBQ0Y7QUFORCw4QkFNQztBQUVELGtCQUFlLFNBQVMsQ0FBQSJ9