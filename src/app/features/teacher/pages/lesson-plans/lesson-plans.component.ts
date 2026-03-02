import { Component } from '@angular/core';
import { TeacherService } from '../../teacher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson-plans',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './lesson-plans.component.html',
})
export class LessonPlansComponent {
  lessonPlan: any = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.lessonPlan = this.teacherService.getLessonPlans().lessonPlans;
  }
}
