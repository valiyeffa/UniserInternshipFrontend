import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teacher',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  standalone: true,
  templateUrl: './teacher.component.html',
})

export class TeacherComponent {

}
