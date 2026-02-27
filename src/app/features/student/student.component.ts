import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student',
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  standalone: true,
  templateUrl: './student.component.html',
})

export class StudentComponent {

}
