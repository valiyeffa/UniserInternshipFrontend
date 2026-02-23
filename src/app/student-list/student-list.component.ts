import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../students/student.interface';
import { StudentItemComponent } from '../student-item/student-item.component';
@Component({
  selector: 'app-student-list',
  imports: [StudentItemComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  @Input() students: Student[] = [];

  @Output() deleteStudent = new EventEmitter<number>();

  onDelete(id: number) {
    this.deleteStudent.emit(id);
  }
}
