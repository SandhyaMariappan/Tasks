import { Component, signal } from '@angular/core';
import { TodoComponent } from './todo/todo';

@Component({
  imports: [TodoComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('task-3-todoapp');
}
