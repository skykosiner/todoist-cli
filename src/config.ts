import * as fs from "fs";

export type Config = {
    token: string;
}

export function getConfig(configPath?: string): Config {
    if (!configPath) {
        configPath = `${process.env.HOME}/.config/todoist-cli/config.json`
    }

    const config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return config
}
