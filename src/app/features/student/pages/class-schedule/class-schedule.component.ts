import { Component } from '@angular/core';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-class-schedule',
  imports: [],
  standalone: true,
  templateUrl: './class-schedule.component.html',
})
export class ClassScheduleComponent {
  classSchedule: any = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.classSchedule = this.studentService.getLessonShedule().schedule;
  }

}
