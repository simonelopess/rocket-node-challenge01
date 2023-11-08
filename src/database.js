import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
    #database = {}


    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist
        })
    }

    
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data];
        }

        this.#persist();
        return data;
    }

    select(table) {
        let data = this.#database[table] ?? []

        return data;
    }

    delete(table, id) {
        const rowIndex  = this.#database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }   
    
    update(table, id, data) {
        const rowIndex  = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = {...this.#database[table][rowIndex], ...data}
            this.#persist();
        }
    }

    completeTask(table, id, completed) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) {
            if (completed) {
                this.#database[table][rowIndex] = { ...this.#database[table][rowIndex], completed_at: new Date()}
                this.#persist();
            } else {
                return this.#database[table][rowIndex]
            }
        }
    }
}