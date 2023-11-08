/* 
    POST -> /tasks
    GET -> /tasks
    PUT -> /tasks/:id
    DELETE -> /tasks/:id
    PATCH -> /tasks/:id/complete */
import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';


const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks');
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body || {};

            if (title && description) {
                const task = {
                    id: randomUUID(),
                    title,
                    description,
                    completed_at: null,
                    created_at: new Date(),
                    updated_at: new Date()
                }
               
                database.insert('tasks', task)
                return res.writeHead(201).end();
            }
            return res.writeHead(404).end('Missing information! Title or description not found')

        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            database.delete('tasks', id);
            return res.writeHead(204).end()
        }
    }
]