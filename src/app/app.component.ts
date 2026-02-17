import { Component } from '@angular/core';
import { TODO, User } from './models/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from "./components/courses/courses.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CoursesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';
  count: number = 0;

  increase() {
    this.count++;
  }

  decrease() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
  
  users: User[] = [
    {
      id: 1,
      name: 'Firuza',
      email: 'firuza@gmail.com',
      isActive: true
    },
    {
      id: 2,
      name: 'Ali',
      email: 'ali@gmail.com',
      isActive: false
    },
    {
      id: 3,
      name: 'Firuza 123',
      email: 'firuza@gmail.com',
      isActive: true
    },
  ];

  // !============================TODO START================================

  newTodo: string = '';
  todos: TODO[] = [];

  addTodo() {
    this.todos.push({
      id: this.todos.length + 1,
      task: this.newTodo,
      completed: false
    })

    this.newTodo = '';
  }

  doneTodo(todo: TODO) {
    todo.completed = !todo.completed;
  }

  delTodo(todo: TODO) {
    this.todos = this.todos.filter(i => i.id !== todo.id)
  }
}
