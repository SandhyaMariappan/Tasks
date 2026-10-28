import { computed, Injectable, signal } from '@angular/core';
import { Todo, TodoFilter } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todosState = signal<Todo[]>([]); //changing the tasks
  readonly todos = this.todosState.asReadonly();    //viewing the tasks(component can read the task)

  private readonly filterState = signal<TodoFilter>('all');
  readonly filter = this.filterState.asReadonly();

  private nextId = 1; 

  readonly totalCount = computed(() => this.todosState().length);

  readonly completedCount = computed(() => this.todosState().filter(todo => todo.done).length);

  readonly remainingCount = computed(() => this.todosState().filter(todo => !todo.done).length);

  readonly filteredTodos = computed(() =>
   {
    const todos = this.todosState();
    const filter = this.filterState();

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.done);

      case 'completed':
        return todos.filter(todo => todo.done); //produces a new array

      default:
        return todos; //returns the original array
    }
  });

  addTodo(title: string): void {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: this.nextId++,
      title: trimmedTitle,
      done: false
    };

    this.todosState.update(todos => [...todos, newTodo]);
  }

  toggleTodo(id: number): void {
    this.todosState.update(todos => todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  }//signal passes the current task array as todos

  updateTodoTitle(id: number, title: string): void {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    this.todosState.update(todos => todos.map(todo => todo.id === id ? { ...todo, title: trimmedTitle }: todo ));
  }

  deleteTodo(id: number): void {
    this.todosState.update(todos => todos.filter(todo => todo.id !== id) );
  }

  clearCompleted(): void {
    this.todosState.update(todos => todos.filter(todo => !todo.done) );
  }

  setFilter(filter: TodoFilter): void {
    this.filterState.set(filter); //changes the filter signal to the passed argument
  }
}