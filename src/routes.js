/* 
    POST -> /tasks
    GET -> /tasks
    PUT -> /tasks/:id
    DELETE -> /tasks/:id
    PATCH -> /tasks/:id/complete */
import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            const tasks = database.select('tasks');
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: '/tasks',
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
    }
]