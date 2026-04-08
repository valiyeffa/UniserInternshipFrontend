import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  constructor(public loader: LoaderService) { }

}
