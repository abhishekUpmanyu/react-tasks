import { v4 as uuidv4 } from 'uuid';

export default class Task {
    #uuid;
    #title;
    #description;
    #color;
    #done;

    constructor(title, description, color, done) {
        this.#uuid = uuidv4(); // TODO: Make uuid
        this.#title = title
        this.#description = description;
        this.#color = color;
        this.#done = done;
    }

    get uuid() {
        return this.#uuid;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get color() {
        return this.#color;
    }

    get done() {
        return this.#done;
    }

    updateTitle(title) {
        // validation
        this.#title = title;
    }
    
    toggleDone() {
        this.#done = !this.#done;
    }
}