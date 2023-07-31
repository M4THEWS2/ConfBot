export class SettingsNotLoaded extends Error {
    constructor() {
        super("Settings was not loaded.");
    }
}

export class CommandsNotLoaded extends Error {
    constructor(interactionCommandName: string) {
        super(`Tried to execute '${interactionCommandName}' when commands were not loaded.`);
    }
}

export class CommandNotFound extends Error {
    constructor(interactionCommandName: string) {
        super(`Command '${interactionCommandName}' not found or not loaded.`);
    }
}

export class TokenNotFound extends Error {
    constructor() {
        super("Token not found in settings.");
    }
}

export class ApplicationIdNotFound extends Error {
    constructor() {
        super("Application ID ('application') not found in settings.");
    }
}
