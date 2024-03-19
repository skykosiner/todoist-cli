import { getConfig } from "./config";
import { Todoist } from "./todoist";

const config = getConfig();

if (!config.token) {
    console.error("No token found in config file. Plaese check the README for instructions on how to set up the config file.")
    process.exit(1);
}

const todoist = new Todoist(config);

// Read the $1 argument from the command line
const command = process.argv[2];

switch (command) {
    case "--today":
        todoist.getToday();
        break;
    case "--close":
        const id = process.argv[3];
        todoist.closeTask(id);
        break;
}
