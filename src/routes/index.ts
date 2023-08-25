import { FastifyInstance } from 'fastify'
import { todos } from '../database'
import { Todo } from '../types/types'

export const routes = (
  server: FastifyInstance,
  options: any,
  done: () => void
) => {
  server.get('/todos', async (request, reply) => {
    reply.code(200).send(todos)
  })

  server.get('/todos/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const todo = todos.find((todo) => todo.id === id)

    if (!todo) {
      reply.code(404).send()
      return
    }

    reply.code(200).send(todo)
  })

  server.post<{ Body: Todo }>('/todos', async (request, reply) => {
    const todo = request.body

    todos.push(todo)

    reply.code(201).send(todo)
  })

  server.put<{ Body: Partial<Todo>; Params: { id: string } }>(
    '/todos/:id',
    async (request, reply) => {
      const { id } = request.params
      const { title, completed } = request.body

      const todo = todos.find((todo) => todo.id === id)

      if (!todo) {
        reply.code(404).send()
        return
      }

      todo.title = title ?? todo.title
      todo.completed = completed ?? todo.completed

      reply.code(200).send(todo)
    }
  )

  server.delete<{ Params: { id: string } }>(
    '/todos/:id',
    async (request, reply) => {
      const { id } = request.params
      const todoIndex = todos.findIndex((todo) => todo.id === id)

      if (todoIndex === -1) {
        reply.code(404).send()
        return
      }

      todos.splice(todoIndex, 1)

      reply.code(200).send()
    }
  )

  done()
}
