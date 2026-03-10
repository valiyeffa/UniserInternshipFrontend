import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-body',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './main-body.component.html',
})
export class MainBodyComponent {
  subMenus: any[] = [];

  constructor(private route: Router) { }

  ngOnInit() {
    if (this.route.url.includes('teacher')) {
      this.subMenus = this.teacherSubMenus;
    } else if (this.route.url.includes('student')) {
      this.subMenus = this.studentSubMenus;
    }
  }

  teacherSubMenus = [
    { id: 1, title: 'Lesson Plan', link: '/main/teacher' },
    { id: 2, title: 'Student Assessment', link: '/main/teacher/student-assessment' },
    { id: 3, title: 'Attendance Management', link: '/main/teacher/attendance-management' },
    { id: 4, title: 'Students List', link: '/main/teacher/students-list' },
  ]

  studentSubMenus = [
    { id: 1, title: 'Class Schedule', link: '/main/student' },
    { id: 2, title: 'Electron Journal', link: '/main/student/electron-journal' },
    { id: 3, title: 'Grade table', link: '/main/student/grade-table' },
  ]
}
