import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { Students } from '../../models/model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../shorten.pipe';

@Component({
  selector: 'app-students-card',
  imports: [MatCardModule, MatButtonModule, CommonModule, ShortenPipe],
  templateUrl: './students-card.component.html',
})

export class StudentsCardComponent {
  @Input() item!: Students;
  @Output() deleteStudent = new EventEmitter<any>();

  onDelete() {
    this.deleteStudent.emit(this.item.id);
  }

  ngOnChanges() {
    console.log("Input dəyişdi");
  }
}
