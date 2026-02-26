import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Courses } from '../../models/model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './course-card.component.html',
})

export class CourseCardComponent {
  @Input() item!: Courses ;
}