import { Component, Input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { Students } from '../../models/model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-students-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './students-card.component.html',
  styleUrl: './students-card.component.css'
})
export class StudentsCardComponent {
  @Input() item!: Students;
}
