import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-student-item]',
  // app-student-item-i attribute selector-a çevirdik
  imports: [],
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.css'
})
export class StudentItemComponent {
  
  @Input() student: any;
   //  Parent-dən (StudentList) bir student obyekti alır

  @Output() deleteStudent = new EventEmitter<number>();
    //  Delete basılanda parent-ə student-in id-sini göndərir

  onDelete() {
    this.deleteStudent.emit(this.student.id);
      //  Bu funksiyanı Delete düyməsi çağıracaq

  }
}


