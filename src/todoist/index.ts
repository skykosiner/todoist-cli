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
    project_id: number,
    priority: string,
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

    public async getToday(options: Array<string>) {
        const tasks = await this.getActiveTodos();
        const today = new Date().toISOString().split("T")[0];
        const formatedTasks: string[] = [];

        for (const task of tasks) {
            if (task.due && task.due.date < today && !task.is_completed) {
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
}
