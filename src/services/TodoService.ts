import { PrismaClient } from '@prisma/client'
import { Todo } from '../types/types'

export class TodoService {
  prisma = new PrismaClient()

  constructor() {}

  async getTodos() {
    return this.prisma.todo.findMany()
  }

  async getTodoById(id: number) {
    return this.prisma.todo.findUnique({ where: { id } })
  }

  async createTodo(todo: Todo) {
    return this.prisma.todo.create({ data: todo })
  }

  async updateTodoById(id: number, todo: Partial<Todo>) {
    return this.prisma.todo.update({ where: { id }, data: todo })
  }

  async deleteTodoById(id: number) {
    return this.prisma.todo.delete({ where: { id: id } })
  }
}
