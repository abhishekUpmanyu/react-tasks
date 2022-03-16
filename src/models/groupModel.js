import { v4 as uuidv4 } from 'uuid';
import Task from "./taskModel";

export default class Group {
    #uuid;
    #name;
    #tasks;

    constructor(name) {
        this.#uuid = uuidv4();
        this.#name = name;
        this.#tasks = [];
    }

    get uuid() {
        return this.#uuid;
    }

    get name() {
        return this.#name;
    }

    get tasks() {
        return this.#tasks;
    }

    addTask(newTask) {
        if (newTask instanceof Task) {
            this.#tasks.splice(0, 0, newTask);
        }
    }

    toggleDone(index) {
        this.#tasks[index].toggleDone();
    }
}