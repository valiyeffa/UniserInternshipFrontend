import { Component } from '@angular/core';
import { StudentService } from '../../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grade-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grade-table.component.html',
})
export class GradeTableComponent {
  gradeTable: any = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.gradeTable = this.studentService.getGrades().grades;
  }
}
