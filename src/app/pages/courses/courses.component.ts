import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CourseCardComponent } from "../../components/course-card/course-card.component";
import { HttpClient } from '@angular/common/http';
import { Courses } from '../../models/model';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [FormsModule, CourseCardComponent, MatFormFieldModule, MatSelectModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent {
  courses: Courses[] = [];
  selectedValue !: string;
  isLoading = true;

  filters: any[] = [
    { value: '0', viewValue: 'None' },
    { value: '23', viewValue: '2-3 Rate' },
    { value: '34', viewValue: '3-4 Rate' },
    { value: '45', viewValue: '4-5 Rate' },
  ]

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Courses[]>('https://mocki.io/v1/3110cfad-7a4c-4a12-ad6c-9b3230f9d9dd')
      .subscribe((data: any) => {
        this.courses = data.courses;
        this.isLoading = false;
      })
  }

  get filteredCourses(): Courses[] {
    if (!this.selectedValue) return this.courses;

    return this.courses.filter(c => {
      if (this.selectedValue === '23') {
        return c.rating >= 2 && c.rating <= 3;
      } else if (this.selectedValue === '34') {
        return c.rating >= 3 && c.rating <= 4;
      } else if (this.selectedValue === '45') {
        return c.rating >= 4 && c.rating <= 5;
      } else if (this.selectedValue === '0') {
        return c.rating
      } else {
        return false;
      }
    });
  }
}
