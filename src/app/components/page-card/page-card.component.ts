import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { Modules } from '../../models/model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-page-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './page-card.component.html',
})

export class PageCardComponent {
  @Input() item!: Modules;

}
