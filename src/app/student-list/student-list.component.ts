import { Component, Input } from '@angular/core';
import { Student } from '../students/student.interface';
@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  @Input() students: Student[] = [];

  handleDeleteStudent(id: number) {
    this.students.splice(this.students.findIndex(item => item.id === id), 1);
    console.log('hi');
  }
}
