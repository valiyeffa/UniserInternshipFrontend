import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-item',
  imports: [],
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.css'
})
export class StudentItemComponent {
  @Input() item:any = {};
}
