import { Component } from '@angular/core';
import { CourseCardComponent } from "../../components/course-card/course-card.component";
import { HttpClient } from '@angular/common/http';
import { Courses } from '../../models/model';

@Component({
  selector: 'app-courses',
  imports: [CourseCardComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent {
  courses: Courses[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Courses[]>('https://mocki.io/v1/3eb2e6e2-057d-480e-92f3-274f65715636')
      .subscribe((data: any) => {
        this.courses = data.courses;
      })
  }
}
