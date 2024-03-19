"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
var fs = require("fs");
function getConfig(configPath) {
    if (!configPath) {
        configPath = "".concat(process.env.HOME, "/.config/todoist-cli/config.json");
    }
    var config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return config;
}
exports.getConfig = getConfig;
