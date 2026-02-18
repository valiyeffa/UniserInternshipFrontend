import { Component, signal } from '@angular/core';

type Student = {
  id: number;
  name: string;
  surname: string;
  age: number;
}

@Component({
  selector: 'app-students',
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})

export class StudentsComponent {
  students = signal<Student[]>([
    {id: 1, name: 'Lala', surname: 'Alimova', age: 20},
    {id: 2, name: 'Gulay', surname: 'Movlamova', age: 20},
    {id: 3, name: 'Nigar', surname: 'Asadova', age: 20}
  ])
}
