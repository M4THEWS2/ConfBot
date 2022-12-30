import { readFileSync } from "fs";

export type ExecutableList = Map<string, { options: Options; actions: Array<Options> }>;

type Section = { children: SectionList; items?: Options };
type SectionList = Map<string, Section>;

export class Options extends Map<string, string> {
	getArray(prefix: string): Array<string> {
		let arr: Array<string> = [];

		for (let [key, value] of this) {
			let _c: Array<string>;
			if (key.startsWith(prefix) && !Number.isNaN(Number.parseInt((_c = key.split("-"))[_c.length - 1]))) {
				arr.push(value);
			}
		}

		return arr;
	}
}

export class Config {
	private readonly data: SectionList;
	private readonly global: Section;

	constructor(path: string) {
		this.data = new Map();
		this.data.set("global", { children: new Map() });

		const configLines: Array<string> = readFileSync(path, { encoding: "utf-8" }).split("\n");

		let sectionFather: Section = <Section>this.data.get("global");
		for (let line of configLines) {
			line = line.trimStart().trimEnd();

			if (line.startsWith("#") || line.startsWith(";") || line == "") {
				continue;
			}

			if (line.startsWith("[") && line.endsWith("]")) {
				let tree: Array<string> = line.slice(1, -1).split(".");
				sectionFather = <Section>this.data.get("global");
				for (let sectionName of tree) {
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
					sectionFather.items = new Options();
				}

				sectionFather.items.set(key, value);
			}
		}

		this.global = <Section>this.data.get("global");
	}

	public getExecutables(type: string): ExecutableList {
		let executableList: ExecutableList = new Map();

		if (!this.global.children.has(type)) {
			throw new Error(`Configuration file doesn't has section of name: ${type}`);
		}

		for (let [executable, section] of <SectionList>this.global.children.get(type)?.children) {
			let actions: Array<Options> = [],
				options: Options = new Options();

			if (section.children.has("options") && section.children.get("options")?.items) {
				for (let [key, value] of <Options>section.children.get("options")?.items) {
					options.set(key, value);
				}
			}

			if (section.children.has("actions") && section.children.get("actions")?.children.size) {
				for (let [_, action] of <SectionList>section.children.get("actions")?.children) {
					if (!action.items) {
						continue;
					}

					let newAction: Options = new Options();
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

	public get options(): Options | undefined {
		return this.global.children.get("options")?.items;
	}
}
