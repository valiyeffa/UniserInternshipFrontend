import { Component, DestroyRef, inject } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-settings',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './settings.component.html',
  styles: ``
})
export class SettingsComponent {
  subMenus!: any[];
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private globalService: GlobalService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadMenus();

    this.globalService.menusRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadMenus();
      })
  }

  private loadMenus() {
    this.globalService.getMenus(8).subscribe({
      next: (res) => {
        this.subMenus = res.data;
        // console.log(this.subMenus);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
