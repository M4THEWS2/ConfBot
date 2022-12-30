import { readFileSync } from "fs";

export type ExecutableList = Map<string, { options: Items; actions: Array<Items> }>;

type Section = { children: SectionList; items?: Items };
type SectionList = Map<string, Section>;

export class Items extends Map<string, string> {
	public isAlphaNumeric(x: string): boolean {
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

	public getArray(prefix: string): Array<string> {
		const arr: Array<string> = [];

		for (const [key, value] of this) {
			let _c: Array<string>;
			if (key.startsWith(prefix) && !this.isAlphaNumeric((_c = key.split("-"))[_c.length - 1])) {
				arr.push(value);
			}
		}

		return arr;
	}
}

export class Config {
	private readonly data: SectionList;

	constructor(path: string) {
		this.data = new Map();
		this.data.set("global", { children: new Map() });

		const configLines: Array<string> = readFileSync(path, { encoding: "utf-8" }).split("\n"); // Find better way to split lines

		let sectionFather: Section = this.global;
		for (let line of configLines) {
			line = line.trimStart().trimEnd();

			if (line.startsWith("#") || line.startsWith(";") || line == "") {
				continue;
			}

			if (line.startsWith("[") && line.endsWith("]")) {
				const tree: Array<string> = line.slice(1, -1).split(".");
				sectionFather = this.global;
				for (const sectionName of tree) {
					if (!sectionFather.children.has(sectionName)) {
						sectionFather.children.set(sectionName, { children: new Map() });
					}

					sectionFather = <Section>sectionFather.children.get(sectionName);
				}
			} else {
				let [key, value] = line.split("=");

				if (value) {
					value = value.trimStart().trimEnd();
				} else {
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

	public getExecutables(type: string): ExecutableList {
		const executableList: ExecutableList = new Map();

		if (!this.global.children.has(type)) {
			throw new Error(`Configuration file doesn't has section of name: '${type}'`);
		}

		for (const [executable, section] of <SectionList>this.global.children.get(type)?.children) {
			const actions: Array<Items> = [],
				options: Items = new Items();

			let _o: Items | undefined;
			if ((_o = section.children.get("options")?.items)) {
				for (const [key, value] of _o) {
					options.set(key, value);
				}
			}

			let _l: Section | undefined;
			if ((_l = section.children.get("actions")) && _l?.children?.size) {
				for (const [_, action] of _l.children) {
					if (!action.items) {
						throw new Error(`Error: action doesn't have any options. On executable: '${executable}'`);
					}

					const newAction: Items = new Items();
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

	public get options(): Items | undefined {
		return this.global.children.get("options")?.items;
	}

	public get global(): Section {
		return <Section>this.data.get("global");
	}
}
