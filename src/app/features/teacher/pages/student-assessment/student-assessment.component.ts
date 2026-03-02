import { Component } from '@angular/core';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-student-assessment',
  imports: [],
  standalone: true,
  templateUrl: './student-assessment.component.html',
})
export class StudentAssessmentComponent {
  studentAssesment: any = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.studentAssesment = this.teacherService.getStudentAssessments().grading;
  }
}
