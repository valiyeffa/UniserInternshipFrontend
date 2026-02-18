import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from '../../models/model';
import { StudentsCardComponent } from "../../components/students-card/students-card.component";

@Component({
  selector: 'app-students',
  imports: [StudentsCardComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  students: Students[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Students[]>('https://mocki.io/v1/870fad4f-470d-4fdf-8f07-d667cdabe5fb')
      .subscribe((data: any) => {
        this.students = data.students;
      })
  }
}
