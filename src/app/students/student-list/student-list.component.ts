import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StudentItemComponent } from '../student-item/student-item.component';

@Component({
  selector: 'app-student-list',
  imports: [StudentItemComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {

  @Input() students: any[] = [];
  //  Parent-dən (StudentsPage) bütün student siyahısını alır

  @Output() deleteStudent = new EventEmitter<number>();
  //  StudentItem-dən gələn silmə siqnalını yuxarıya StudentsPage-ə ötürür

  onDelete(id: number) {
    this.deleteStudent.emit(id);
    //  StudentItem-dən id gəlir, onu StudentsPage-ə göndərir
  }
}