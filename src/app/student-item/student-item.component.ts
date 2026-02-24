import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Student } from '../students/student.interface';
import { UpperCasePipe } from '@angular/common';
import { nameConverter } from '../students/nameConverter.pipe';
@Component({
  selector: 'app-student-item',
  imports: [UpperCasePipe, nameConverter],
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.css'
})
export class StudentItemComponent {
  @Input() student!: Student;  
  @Output() deleteStudent = new EventEmitter<number>();  

  onDelete() {
    this.deleteStudent.emit(this.student.id); 
  }

  ngOnInit() {
    console.log("Students item component initialized");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes detected in students item: ', changes);
  }

  ngOnDestroy() {
    console.log('Students item component destroyed');
  }
}