"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var help_1 = require("./help");
var todoist_1 = require("./todoist");
var config = (0, config_1.getConfig)();
if (!config.token) {
    console.error("No token found in config file. Plaese check the README for instructions on how to set up the config file.");
    process.exit(1);
}
var todoist = new todoist_1.Todoist(config);
var command = process.argv[2];
switch (command) {
    case "today":
        var options = process.argv.slice(3);
        todoist.getToday(options);
        break;
    case "close":
        var id = process.argv[3];
        todoist.closeTask(id);
        break;
    case "delete":
        var id2 = process.argv[3];
        todoist.deleteTask(id2);
    case "help":
        console.log((0, help_1.getHelp)());
        break;
    default:
        console.log((0, help_1.getHelp)());
        break;
}
