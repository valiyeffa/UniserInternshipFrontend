import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Courses } from '../../models/model';

@Component({
  selector: 'app-course-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CourseCardComponent {
  @Input() item!: Courses ;
}