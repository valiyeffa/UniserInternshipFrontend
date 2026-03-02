import { Component } from '@angular/core';
import { TeacherService } from '../../teacher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-management',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './attendance-management.component.html',
})
export class AttendanceManagementComponent {
  attendance: any = [];
  
  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.attendance = this.teacherService.getAttendanceRecords().attendance;
  }
}
