import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student',
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  standalone: true,
  templateUrl: './student.component.html',
})

export class StudentComponent {
  subMenus = [
    { id: 1, title: 'Class Schedule', link: '/students-module' },
    { id: 2, title: 'Electron Journal', link: '/students-module/electron-journal' },
    { id: 3, title: 'Grade table', link: '/students-module/grade-table' },
  ]
}
