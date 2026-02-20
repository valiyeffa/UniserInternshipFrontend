import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students, StudentsList } from '../../models/model';
import { StudentsCardComponent } from "../../components/students-card/students-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  imports: [StudentsCardComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './students.component.html',
})

export class StudentsComponent {
  students: Students[] = [];
  isLoading = true;
  newStudentName = '';

  StudentsList: StudentsList[] = [
    { id: 1, nameSurname: 'Firuza Valiyeva' },
    { id: 2, nameSurname: 'Cavid Ismayilov' },
    { id: 3, nameSurname: 'Konul Aliyeva' },
    { id: 4, nameSurname: 'Rahida Residli' },
    { id: 5, nameSurname: 'İsmayil Abdurehmanli' }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Students[]>('https://mocki.io/v1/870fad4f-470d-4fdf-8f07-d667cdabe5fb')
      .subscribe((data: any) => {
        this.students = data.students;
        this.isLoading = false;
      })
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(i => i.id !== id);
  }

  addNewStudentList() {
    this.StudentsList.push(
      { id: this.StudentsList.length + 1, nameSurname: this.newStudentName }
    )

    this.newStudentName = '';
  }

  deleteStudentList(id: number) {
    this.StudentsList = this.StudentsList.filter(i => i.id !== id)
  }
}
