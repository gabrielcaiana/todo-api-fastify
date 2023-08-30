import { FastifyInstance } from 'fastify'
import { Todo } from '../types/types'
import { TodoService } from '../services/TodoService'

export const TodoController = (
  server: FastifyInstance,
  options: any,
  done: () => void
) => {
  server.get('/todos', async (request, reply) => {
    const todoService = new TodoService()
    const todos = await todoService.getTodos()

    reply.code(200).send(todos)
  })

  server.get('/todos/:id', async (request, reply) => {
    const { id } = request.params as { id: number }
    const todoService = new TodoService()
    const todo = await todoService.getTodoById(Number(id))

    if (!todo) {
      reply.code(404).send()
      return
    }

    reply.code(200).send(todo)
  })

  server.post<{ Body: Todo }>('/todos', async (request, reply) => {
    const todoBody = request.body
    const todoService = new TodoService()
    const todo = await todoService.createTodo(todoBody)

    reply.code(201).send(todo)
  })

  server.put<{ Body: Partial<Todo>; Params: { id: number } }>(
    '/todos/:id',
    async (request, reply) => {
      const { id } = request.params
      const { title, completed } = request.body

      const todoService = new TodoService()
      const todo = await todoService.updateTodoById(Number(id), {
        title,
        completed,
      })

      if (!todo) {
        reply.code(404).send({ error: 'Todo not found' })
        return
      }

      reply.code(200).send(todo)
    }
  )

  server.delete<{ Params: { id: number } }>(
    '/todos/:id',
    async (request, reply) => {
      const { id } = request.params
      const todoService = new TodoService()
      await todoService.deleteTodoById(Number(id))

      reply.code(204).send()
    }
  )

  done()
}
