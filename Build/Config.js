"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.Options = void 0;
const fs_1 = require("fs");
class Options extends Map {
    getArray(prefix) {
        let arr = [];
        for (let [key, value] of this) {
            let _c;
            if (key.startsWith(prefix) && !Number.isNaN(Number.parseInt((_c = key.split("-"))[_c.length - 1]))) {
                arr.push(value);
            }
        }
        return arr;
    }
}
exports.Options = Options;
class Config {
    constructor(path) {
        this.data = new Map();
        this.data.set("global", { children: new Map() });
        const configLines = (0, fs_1.readFileSync)(path, { encoding: "utf-8" }).split("\n");
        let sectionFather = this.data.get("global");
        for (let line of configLines) {
            line = line.trimStart().trimEnd();
            if (line.startsWith("#") || line.startsWith(";") || line == "") {
                continue;
            }
            if (line.startsWith("[") && line.endsWith("]")) {
                let tree = line.slice(1, -1).split(".");
                sectionFather = this.data.get("global");
                for (let sectionName of tree) {
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
                    sectionFather.items = new Options();
                }
                sectionFather.items.set(key, value);
            }
        }
        this.global = this.data.get("global");
    }
    getExecutables(type) {
        var _a, _b, _d, _e, _f;
        let executableList = new Map();
        if (!this.global.children.has(type)) {
            throw new Error(`Configuration file doesn't has section of name: ${type}`);
        }
        for (let [executable, section] of (_a = this.global.children.get(type)) === null || _a === void 0 ? void 0 : _a.children) {
            let actions = [], options = new Options();
            if (section.children.has("options") && ((_b = section.children.get("options")) === null || _b === void 0 ? void 0 : _b.items)) {
                for (let [key, value] of (_d = section.children.get("options")) === null || _d === void 0 ? void 0 : _d.items) {
                    options.set(key, value);
                }
            }
            if (section.children.has("actions") && ((_e = section.children.get("actions")) === null || _e === void 0 ? void 0 : _e.children.size)) {
                for (let [_, action] of (_f = section.children.get("actions")) === null || _f === void 0 ? void 0 : _f.children) {
                    if (!action.items) {
                        continue;
                    }
                    let newAction = new Options();
                    for (let [key, value] of action.items) {
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
}
exports.Config = Config;
