import { readFileSync as readFile } from "fs";

export interface Items {
	[key: string | symbol]: string;
}

export interface Section {
	items?: Items;
	subsections?: Sections;
}

export interface Sections {
	[name: string]: Section;
}

export class INIFile {
	private readonly sections: Sections;

	constructor(sections: Sections) {
		this.sections = sections;
	}

	getSection(name: string, section: Section = this.sections.global): Section | undefined {
		return section.subsections?.[name];
	}

	hasSection(name: string, section: Section = this.sections.global): boolean | undefined {
		if (section.subsections?.[name]) return true;
		return false;
	}

	getItem(key: string, section: Section = this.sections.global): string | undefined {
		return section.items?.[key];
	}

	hasItem(key: string, section: Section = this.sections.global): boolean | undefined {
		if (section.items?.[key]) return true;
		return false;
	}
}

export function parse(path: string): INIFile {
	const fileLines: string[] = readFile(path, { encoding: "utf-8" }).split("\n");

	const sections: Sections = {};
	sections.global = { subsections: {} };

	let lastSection: Section = sections.global;
	for (let line of fileLines) {
		line = line.trimStart().trimEnd();

		if (line.startsWith(";") || line.startsWith("#") || line == "") continue;

		if (line.startsWith("[")) {
			if (!line.endsWith("]")) throw new Error(`missing ']' in line: '${line}'`);

			line = line.trim().slice(1, -1);
			lastSection = sections.global;

			for (const section of line.split(".")) {
				if (!lastSection.subsections) lastSection.subsections = {};

				if (!lastSection.subsections[section]) lastSection.subsections[section] = {};

				lastSection = lastSection.subsections[section];
			}

			continue;
		}

		let [key, value] = line.split("=");

		key = key.trimEnd();

		if (value == null) value = "";
		else value = value.trimStart();

		if (!lastSection.items) lastSection.items = {};

		lastSection.items[key] = value;
	}

	return new INIFile(sections);
}
