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
exports.BaseAction = void 0;
class BaseAction {
    constructor(options) {
        this.__options = options;
        this.options = Object.assign({}, this.__options);
    }
    loadVars(currSec, inter) {
        var _a;
        for (const key in currSec) {
            if (key === '__children') {
                for (const child in currSec.__children) {
                    this.loadVars(currSec.__children[child], inter);
                }
                continue;
            }
            currSec[key] = currSec[key].replace(/{user-name}/g, inter.user.username);
            currSec[key] = currSec[key].replace(/{user-id}/g, inter.user.id);
            currSec[key] = currSec[key].replace(/{user-mention}/g, `<@${inter.user.id}>`);
            currSec[key] = currSec[key].replace(/{channel-id}/g, (_a = inter.channelId) !== null && _a !== void 0 ? _a : '');
        }
    }
    baseDo(inter, client) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    do(inter, client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadVars(this.options, inter);
            yield this.baseDo(inter, client);
            this.options = Object.assign({}, this.__options);
        });
    }
}
exports.BaseAction = BaseAction;
exports.default = BaseAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CYXNlQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLE1BQWEsVUFBVTtJQUlyQixZQUFhLE9BQWdCO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFFUyxRQUFRLENBQUUsT0FBZ0IsRUFBRSxLQUFrQjs7UUFDdEQsS0FBSyxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUU7WUFDekIsSUFBSSxHQUFHLEtBQUssWUFBWSxFQUFFO2dCQUN4QixLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtpQkFDaEQ7Z0JBRUQsU0FBUTthQUNUO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDbEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFFdkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLE1BQUEsS0FBSyxDQUFDLFNBQVMsbUNBQUksRUFBRSxDQUFDLENBQUE7U0FDdEY7SUFDSCxDQUFDO0lBRWUsTUFBTSxDQUFFLEtBQWtCLEVBQUUsTUFBYzs4REFBRyxDQUFDO0tBQUE7SUFFeEQsRUFBRSxDQUFFLEtBQWtCLEVBQUUsTUFBYzs7WUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBRWxDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDbEQsQ0FBQztLQUFBO0NBQ0Y7QUFwQ0QsZ0NBb0NDO0FBRUQsa0JBQWUsVUFBVSxDQUFBIn0=