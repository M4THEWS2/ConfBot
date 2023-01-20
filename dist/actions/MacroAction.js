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
exports.MacroAction = void 0;
const BaseAction_1 = require("../BaseAction");
class MacroAction extends BaseAction_1.BaseAction {
    baseDo(inter, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.macro) {
                throw new Error("Macro action needs 'macro' option");
            }
            client.emit('macro', this.options.macro, inter);
        });
    }
}
exports.MacroAction = MacroAction;
exports.default = MacroAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFjcm9BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWN0aW9ucy9NYWNyb0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBMEM7QUFFMUMsTUFBYSxXQUFZLFNBQVEsdUJBQVU7SUFDbkMsTUFBTSxDQUFFLEtBQTZCLEVBQUUsTUFBdUI7O1lBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO2FBQ3JEO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDakQsQ0FBQztLQUFBO0NBQ0Y7QUFQRCxrQ0FPQztBQUVELGtCQUFlLFdBQVcsQ0FBQSJ9