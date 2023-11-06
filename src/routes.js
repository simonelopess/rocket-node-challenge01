/* 
    POST -> /tasks
    GET -> /tasks
    PUT -> /tasks/:id
    DELETE -> /tasks/:id
    PATCH -> /tasks/:id/complete */
import { randomUUID } from 'node:crypto';

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            const tasks = {
                id: randomUUID(),
                title: req.title,
                description: req.description,
                completed_at: null,
                created_at: Date.now(),
                updated_at: Date.now()
            }
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            const { title, description } = req.body || {};

            if (title && description) {
                const tasks = {
                    id: randomUUID(),
                    title,
                    description,
                    completed_at: null,
                    created_at: new Date(),
                    updated_at: new Date()
                }
               
                return res.writeHead(201).end(JSON.stringify(tasks));
            }
            return res.writeHead(404).end('Missing information! Title or description not found')

        }
    }
]