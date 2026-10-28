import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todoService';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class TodoComponent {
  readonly todoService = inject(TodoService); //to access the service

  newTitle = '';
  editingId: number | null = null; //ID of the task currently being edited
  editTitle = ''; //new title while I edit a task.

  addTask(): void {
    this.todoService.addTodo(this.newTitle);
    this.newTitle = '';
  }

  startEditing(todo: Todo): void {
    this.editingId = todo.id; //which task being edited
    this.editTitle = todo.title; //current title
  }

  saveEdit(id: number): void {
    if (!this.editTitle.trim()) {
      return;
    }

    this.todoService.updateTodoTitle(id, this.editTitle);
    this.cancelEditing();
  }

  cancelEditing(): void {
    this.editingId = null;
    this.editTitle = '';
  }

  deleteTask(id: number): void {
    this.todoService.deleteTodo(id);

    if (this.editingId === id) {
      this.cancelEditing();
    }
  }
}