import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teacher',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  standalone: true,
  templateUrl: './teacher.component.html',
})

export class TeacherComponent {
  subMenus = [
    { id: 1, title: 'Lesson Plan', link: '/teacher-module' },
    { id: 2, title: 'Student Assessment', link: '/teacher-module/student-assessment' },
    { id: 3, title: 'Attendance Management', link: '/teacher-module/attendance-management' },
    { id: 4, title: 'Students List', link: '/teacher-module/students-list' },
  ]
}
