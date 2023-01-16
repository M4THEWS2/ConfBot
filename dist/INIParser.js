"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFile = exports.INIFile = void 0;
const node_fs_1 = require("node:fs");
class INIFile {
    constructor(data) {
        this.data = data;
    }
    get global() {
        return this.data;
    }
}
exports.INIFile = INIFile;
function parseFile(path) {
    const file = (0, node_fs_1.readFileSync)(path, { encoding: 'utf-8' });
    const data = { __children: {} };
    let lastSection = data;
    for (let line of file.split('\n')) {
        line = line.trimStart().trimEnd();
        if (line[0] === '#' || line[0] === ';' || line === '')
            continue;
        if (line.startsWith('[') && line.endsWith(']')) {
            lastSection = data;
            for (const sectionName of line.slice(1, -1).split('.')) {
                if (!lastSection.__children[sectionName])
                    lastSection.__children[sectionName] = { __children: {} };
                lastSection = lastSection.__children[sectionName];
            }
        }
        else {
            let [key, value] = line.split('=');
            key = key.trimEnd();
            if (key === '__children')
                continue;
            if (value) {
                value = value.trimStart();
                value = value.replace(/\\n/g, '\n');
            }
            else
                value = '';
            lastSection[key] = value;
        }
    }
    return new INIFile(data.__children);
}
exports.parseFile = parseFile;
exports.default = parseFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSU5JUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0lOSVBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBa0Q7QUFTbEQsTUFBYSxPQUFPO0lBR2xCLFlBQWEsSUFBYztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNsQixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2xCLENBQUM7Q0FDRjtBQVZELDBCQVVDO0FBRUQsU0FBZ0IsU0FBUyxDQUFFLElBQVk7SUFDckMsTUFBTSxJQUFJLEdBQUcsSUFBQSxzQkFBUSxFQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBRWxELE1BQU0sSUFBSSxHQUFZLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFBO0lBRXhDLElBQUksV0FBVyxHQUFZLElBQUksQ0FBQTtJQUMvQixLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUVqQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssRUFBRTtZQUFFLFNBQVE7UUFFL0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUMsV0FBVyxHQUFHLElBQUksQ0FBQTtZQUVsQixLQUFLLE1BQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7b0JBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQTtnQkFFbEcsV0FBVyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUE7YUFDbEQ7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBRWxDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDbkIsSUFBSSxHQUFHLEtBQUssWUFBWTtnQkFBRSxTQUFRO1lBRWxDLElBQUksS0FBSyxFQUFFO2dCQUNULEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUE7Z0JBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTthQUNwQzs7Z0JBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQTtZQUVqQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO1NBQ3pCO0tBQ0Y7SUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNyQyxDQUFDO0FBbkNELDhCQW1DQztBQUVELGtCQUFlLFNBQVMsQ0FBQSJ9