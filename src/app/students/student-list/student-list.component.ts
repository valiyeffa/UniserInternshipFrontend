import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { StudentItemComponent } from '../student-item/student-item.component';
 

@Component({
  selector: 'app-student-list',
  imports: [StudentItemComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() students: any[] = [];
  //  Parent-dən StudentsPage den bütün student siyahısını alır

  @Output() deleteStudent = new EventEmitter<number>();
  //  StudentItem-dən gələn silmə siqnalını yuxarıya StudentsPage-ə ötürür

  @Output() editStudent = new EventEmitter<any>();


  onDelete(id: number) {
    this.deleteStudent.emit(id);
    //  StudentItem-dən id gəlir, onu StudentsPage göndərir
  }

   onEdit(student: any) {
    this.editStudent.emit(student);
}



  constructor() {
    console.log('StudentList - constructor işlədi');
    // component yaradilan zaman isleyir
  }

  ngOnInit() {
    console.log('StudentList - ngOnInit işlədi');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('StudentList - ngOnChanges işlədi', changes);
    //  students @Input() dəyişəndə işə düşür, məsələn student siləndə 
  }

  ngOnDestroy() {
    console.log('StudentList - ngOnDestroy işlədi');
  }

  
}