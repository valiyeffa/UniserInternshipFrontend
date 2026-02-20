import { Component } from '@angular/core';
import { StudentsPageComponent } from './students-page/students-page.component';

@Component({
  selector: 'app-students',
  imports: [StudentsPageComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {}