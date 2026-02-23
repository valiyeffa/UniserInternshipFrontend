import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../students/student.interface';

@Component({
  selector: 'app-student-item',
  imports: [],
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.css'
})
export class StudentItemComponent {
  @Input() student!: Student;  
  @Output() deleteStudent = new EventEmitter<number>();  

  onDelete() {
    this.deleteStudent.emit(this.student.id); 
  }
}