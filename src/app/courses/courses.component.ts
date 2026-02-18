import { Component, signal } from '@angular/core';

type Course = {
  id: number;
  name: string;
}

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent {
  courses = signal<Course[]>([
    {id: 1, name: 'English'},
    {id: 2, name: 'Art'},
    {id: 3, name: 'Math'},
    {id: 4, name: 'Programming'}
  ])
}
