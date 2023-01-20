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
exports.DelayAction = void 0;
const BaseAction_1 = require("../BaseAction");
class DelayAction extends BaseAction_1.BaseAction {
    baseDo(inter) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const time = Number.parseFloat((_a = this.options.time) !== null && _a !== void 0 ? _a : '');
            if (inter.isChatInputCommand() && !inter.deferred && !inter.replied)
                inter.deferReply();
            return new Promise((resolve) => {
                setTimeout(() => { resolve(); }, !Number.isNaN(time) ? (time * 1000) : 5000);
            });
        });
    }
}
exports.DelayAction = DelayAction;
exports.default = DelayAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsYXlBY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWN0aW9ucy9EZWxheUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBMEM7QUFFMUMsTUFBYSxXQUFZLFNBQVEsdUJBQVU7SUFDbkMsTUFBTSxDQUFFLEtBQWtCOzs7WUFDOUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUMsQ0FBQTtZQUNoRSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2dCQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUN2RixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM3RSxDQUFDLENBQUMsQ0FBQTs7S0FDSDtDQUNGO0FBUkQsa0NBUUM7QUFFRCxrQkFBZSxXQUFXLENBQUEifQ==