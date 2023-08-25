import { todos } from '../database'
import { Todo } from '../types/types'

export class TodoService {
  todos: Todo[] = todos

  constructor() {}

  async getTodos() {
    return this.todos
  }

  async getTodoById(id: string) {
    return this.todos.find((todo) => todo.id === id)
  }

  async createTodo(todo: Todo) {
    this.todos.push(todo)
    return todo
  }

  async updateTodoById(id: string, todo: Partial<Todo>) {
    const todoToUpdate = this.todos.find((todo) => todo.id === id)

    if (!todoToUpdate) {
      return null
    }

    todoToUpdate.title = todo.title ?? todoToUpdate.title
    todoToUpdate.completed = todo.completed ?? todoToUpdate.completed

    return todoToUpdate
  }

  async deleteTodoById(id: string) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id)

    if (todoIndex === -1) {
      return null
    }

    const todo = this.todos[todoIndex]
    this.todos.splice(todoIndex, 1)

    return todo
  }
}
