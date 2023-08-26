export class TodoMiddleware {
  constructor() {}

  async checkTodoExists(id: number, prisma: any) {
    if (isNaN(id)) throw new Error('Id must be a number')

    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    })

    return existingTodo
  }
}
