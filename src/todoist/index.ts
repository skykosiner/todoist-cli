import { Config } from "../config";

type Todo = {
    id: number,
    content: string,
    is_completed: boolean,
    due?: {
        date: string,
        is_recurring: boolean,
    },
    parent_id: string,
    project_id: string,
    priority: string,
}

type Project = {
    id: number,
    name: string,
}

export class Todoist {
    private apiUrl: string = "https://api.todoist.com/rest/v2";

    constructor(private config: Config) {
        if (!config) {
            throw new Error("No config provided");
        }
    }

    private async getActiveTodos(): Promise<Array<Todo>> {
        try {
            const resp = await fetch(`${this.apiUrl}/tasks`, {
                headers: {
                    Authorization: `Bearer ${this.config.token}`,
                }
            })

            return resp.json();
        } catch (e) {
            //@ts-ignore
            throw new Error(`Error fetching tasks: ${e.message}`);
        }
    }

    private async getProjects(): Promise<Array<Project>> {
        try {
            const resp = await fetch(`${this.apiUrl}/projects`, {
                headers: {
                    Authorization: `Bearer ${this.config.token}`,
                }
            });

            return resp.json();
        } catch (e) {
            //@ts-ignore
            throw new Error(`Error fetching projects: ${e.message}`);
        }
    }

    public async getToday(options: Array<string>) {
        const tasks = await this.getActiveTodos();
        const today = new Date().toISOString().split("T")[0];
        const formatedTasks: string[] = [];

        for (const task of tasks) {
            if (task.due && task.due.date < today && !task.is_completed) {
                console.log(`Overdue: ${task.content} | ${task.id}`);
                formatedTasks.push(`Overdue: ${task.content} | ${task.id}`)
            }

            if (task.due && task.due.date === today && !task.is_completed) {
                formatedTasks.push(`${task.content} | ${task.id}`);
            }
        }

        for (const task of formatedTasks) {
            if (task.startsWith("Overdue")) {
                for (const option of options) {
                    if (option === "--color") {
                        console.log(`\x1b[31m${task}\x1b[0m`);
                    }
                }
            } else {
                console.log(task);
            }
        }
    }

    public async closeTask(id: string) {
        const resp = await fetch(`${this.apiUrl}/tasks/${id}/close`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.config.token}`,
            }
        });

        if (resp.status === 204) {
            console.log("Task closed successfully");
        } else {
            console.error("Error closing task");
        }
    }

    public async deleteTask(id: string) {
        const resp = await fetch(`${this.apiUrl}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.config.token}`,
            }
        });

        if (resp.status === 204) {
            console.log("Task deleted successfully");
        } else {
            console.error("Error deleting task");
        }
    }

    public async getProjectsList() {
        const projects = await this.getProjects();
        for (const project of projects) {
            console.log(`${project.name} | ${project.id}`);
        }
    }

    public async getProjectTasks(projectId: string) {
        if (projectId.length === 0) {
            console.error("Please provide a valid project id.");
            return;
        }

        console.log(`Tasks for project ${projectId}: `);
        const tasks = await this.getActiveTodos();
        const formatedTasks: string[] = [];

        for (const task of tasks) {
            if (task.project_id === projectId && !task.is_completed) {
                formatedTasks.push(`${task.content} | ${task.id} `);
            }
        }

        for (const task of formatedTasks) {
            console.log(task);
        }
    }
}
