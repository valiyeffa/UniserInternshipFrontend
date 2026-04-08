import { Component, DestroyRef, inject } from '@angular/core';
import { PageCardComponent } from "../../components/page-card/page-card.component";
import { GlobalService } from '../../services/global.service';
import { Modules } from '../../models/model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [PageCardComponent],
  standalone: true,
  templateUrl: './modules.component.html',
})

export class ModulesComponent {
  private readonly destroyRef = inject(DestroyRef);

  constructor(private globalService: GlobalService) { }

  modules!: Modules[];

  ngOnInit() {
    this.loadModules();

    // Subscribe to module changes to refresh the list automatically
    this.globalService.modulesRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadModules();
      })
  }

  private loadModules() {
    this.globalService.getModules().subscribe({
      next: (res) => {
        this.modules = res.data;
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
