import { Component } from '@angular/core';
import { PageCardComponent } from "../../components/page-card/page-card.component";

@Component({
  selector: 'app-home',
  imports: [PageCardComponent],
  standalone: true,
  templateUrl: './home.component.html',
})

export class HomeComponent {
  pages = [
    {
      id: 1,
      title: "Student",
      link: "/students-module"
    },
    {
      id: 2,
      title: "Teacher",
      link: "/teacher-module"
    },
  ]

}
