"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.Items = void 0;
const fs_1 = require("fs");
class Items extends Map {
    isAlphaNumeric(x) {
        for (const c of x) {
            switch (c) {
                case "0":
                    break;
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    break;
                case "4":
                    break;
                case "5":
                    break;
                case "6":
                    break;
                case "7":
                    break;
                case "8":
                    break;
                case "9":
                    break;
                default:
                    return false;
            }
        }
        return true;
    }
    getArray(prefix) {
        const arr = [];
        for (const [key, value] of this) {
            let _c;
            if (key.startsWith(prefix) && !this.isAlphaNumeric((_c = key.split("-"))[_c.length - 1])) {
                arr.push(value);
            }
        }
        return arr;
    }
}
exports.Items = Items;
class Config {
    constructor(path) {
        this.data = new Map();
        this.data.set("global", { children: new Map() });
        const configLines = (0, fs_1.readFileSync)(path, { encoding: "utf-8" }).split("\n"); // Find better way to split lines
        let sectionFather = this.global;
        for (let line of configLines) {
            line = line.trimStart().trimEnd();
            if (line.startsWith("#") || line.startsWith(";") || line == "") {
                continue;
            }
            if (line.startsWith("[") && line.endsWith("]")) {
                const tree = line.slice(1, -1).split(".");
                sectionFather = this.global;
                for (const sectionName of tree) {
                    if (!sectionFather.children.has(sectionName)) {
                        sectionFather.children.set(sectionName, { children: new Map() });
                    }
                    sectionFather = sectionFather.children.get(sectionName);
                }
            }
            else {
                let [key, value] = line.split("=");
                if (value) {
                    value = value.trimStart().trimEnd();
                }
                else {
                    value = "";
                }
                key = key.trimStart().trimEnd();
                if (!sectionFather.items) {
                    sectionFather.items = new Items();
                }
                sectionFather.items.set(key, value);
            }
        }
    }
    getExecutables(type) {
        var _a, _b, _d;
        const executableList = new Map();
        if (!this.global.children.has(type)) {
            throw new Error(`configuration file doesn't has section of name: '${type}'`);
        }
        for (const [executable, section] of (_a = this.global.children.get(type)) === null || _a === void 0 ? void 0 : _a.children) {
            const actions = [], options = new Items();
            let _o;
            if ((_o = (_b = section.children.get("options")) === null || _b === void 0 ? void 0 : _b.items)) {
                for (const [key, value] of _o) {
                    options.set(key, value);
                }
            }
            let _l;
            if ((_l = section.children.get("actions")) && ((_d = _l === null || _l === void 0 ? void 0 : _l.children) === null || _d === void 0 ? void 0 : _d.size)) {
                for (const [_, action] of _l.children) {
                    if (!action.items) {
                        throw new Error(`action doesn't have any options. On executable: '${executable}'`);
                    }
                    const newAction = new Items();
                    for (const [key, value] of action.items) {
                        newAction.set(key, value);
                    }
                    actions.push(newAction);
                }
            }
            executableList.set(executable, { options: options, actions: actions });
        }
        return executableList;
    }
    get options() {
        var _a;
        return (_a = this.global.children.get("options")) === null || _a === void 0 ? void 0 : _a.items;
    }
    get global() {
        return this.data.get("global");
    }
}
exports.Config = Config;
