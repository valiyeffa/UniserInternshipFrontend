import { Component, DestroyRef, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contracts',
  imports: [SideBarComponent],
  templateUrl: './contracts.component.html',
})

export class ContractsComponent {
  subMenus!: any[];
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.loadMenus();

    // Subscribe to menu changes to refresh the list automatically
    this.globalService.menusRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadMenus();
      })
  }

  private loadMenus() {
    this.globalService.getMenus(1).subscribe({
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
