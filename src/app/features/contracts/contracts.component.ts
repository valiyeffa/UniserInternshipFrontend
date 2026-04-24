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
  rowsPerPage = 5;
  currentPage = 1;
  tableRows = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    data: `Data ${index + 1}`,
    info: `Info ${index + 1}`,
    tools: 'Tools',
  }));
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

  get totalPages(): number {
    return Math.ceil(this.tableRows.length / this.rowsPerPage);
  }

  get paginatedRows() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.tableRows.slice(start, start + this.rowsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
