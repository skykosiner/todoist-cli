import { getConfig } from "./config";
import { getHelp } from "./help";
import { Todoist } from "./todoist";

// Get --config flag from command line
const config = getConfig();

if (!config.token) {
    console.error("No token found in config file. Plaese check the README for instructions on how to set up the config file.")
    process.exit(1);
}

const todoist = new Todoist(config);
const command = process.argv[2];

switch (command) {
    case "today":
        const options = process.argv.slice(3);
        todoist.getToday(options);
        break;
    case "close":
        const id = process.argv[3];
        todoist.closeTask(id);
        break;
    case "delete":
        const id2 = process.argv[3];
        todoist.deleteTask(id2);
    case "projects":
        todoist.getProjectsList();
        break;
    case "project":
        const projectId = process.argv[3];
        todoist.getProjectTasks(projectId);
        break;
    case "help":
        console.log(getHelp());
        break;
    default:
        console.log(getHelp());
        break;
}
