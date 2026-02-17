import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name: string = "Diana Məmmədova";
  age: number = 20;
  isStudent: boolean = true;

  inputValue: string = "";

  setValue() {
    this.inputValue = "Hello, Angular!";
  }

  clearInput() {
    this.inputValue = "";
  }


  todos: string[] = [];
newTodo: string = "";

addTodo() {
  if (this.newTodo.trim() !== "") {
    this.todos.push(this.newTodo);
    this.newTodo = "";
  }
}

deleteTodo(index: number) {
  this.todos.splice(index, 1);
}
}
