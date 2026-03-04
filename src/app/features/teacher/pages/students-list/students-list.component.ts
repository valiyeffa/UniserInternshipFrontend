import { Component } from '@angular/core';
import { TeacherService } from '../../teacher.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-students-list',
  imports: [RouterLink],
  templateUrl: './students-list.component.html',
})

export class StudentsListComponent {
  students: any = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.students = this.teacherService.getStudentsList();
  }

  delStudentFunc(id: number) {
    this.teacherService.deleteStudent(id);
    this.students = this.teacherService.getStudentsList();

    alert('Student successfully deleted!');
  }
}
