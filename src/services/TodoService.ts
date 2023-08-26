import { PrismaClient } from '@prisma/client'
import { Todo } from '../types/types'
import { TodoMiddleware } from '../middleware/Todo'

export class TodoService {
  prisma = new PrismaClient()
  todoMiddleware = new TodoMiddleware()

  constructor() {}

  async getTodos() {
    return this.prisma.todo.findMany()
  }

  async getTodoById(id: number) {
    const exist = await this.todoMiddleware.checkTodoExists(id, this.prisma)
    if (!exist) return

    return this.prisma.todo.findUnique({ where: { id } })
  }

  async createTodo(todo: Todo) {
    return this.prisma.todo.create({ data: todo })
  }

  async updateTodoById(id: number, todo: Partial<Todo>) {
    const exist = await this.todoMiddleware.checkTodoExists(id, this.prisma)
    if (!exist) return

    return this.prisma.todo.update({ where: { id }, data: todo })
  }

  async deleteTodoById(id: number) {
    const exist = await this.todoMiddleware.checkTodoExists(id, this.prisma)
    if (!exist) return

    return this.prisma.todo.delete({ where: { id: id } })
  }
}
