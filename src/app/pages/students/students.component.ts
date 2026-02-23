import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from '../../models/model';
import { StudentsCardComponent } from "../../components/students-card/students-card.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  imports: [StudentsCardComponent, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './students.component.html',
})

export class StudentsComponent {
  students: Students[] = [];
  isLoading = true;
  addStudent = '';
  searchNameStudents = '';
  currentDate: Date = new Date();

  searchFilterApi() {
    return this.students.filter(i => i.firstName.toLowerCase().includes(this.searchNameStudents));
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Students[]>('https://mocki.io/v1/870fad4f-470d-4fdf-8f07-d667cdabe5fb')
      .subscribe((data: any) => {
        this.students = data.students;
        this.isLoading = false;
      })

    console.log('Data gəldi');
  }

  ngOnDestroy() {
    console.log("Component silindi");
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(i => i.id !== id);
  }

  addNewStudent() {
    this.students.push(
      { id: this.students.length + 1, firstName: this.addStudent, lastName: '', email: 'test@gmail.com', age: 21, gender: 'None', phone: 99455123456, createdAt: this.currentDate.toISOString() }
    )

    this.addStudent = '';
  }
}