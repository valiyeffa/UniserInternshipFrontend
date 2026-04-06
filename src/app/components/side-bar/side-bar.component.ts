import { Component, Input } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent {
  @Input() subMenus!: any[];
}
