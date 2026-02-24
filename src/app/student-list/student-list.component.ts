import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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

  ngOnInit() {
    console.log("Students list component initialized");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes detected in students list: ', changes);
  }

  ngOnDestroy() {
    console.log('Students list component destroyed');
  }
}
