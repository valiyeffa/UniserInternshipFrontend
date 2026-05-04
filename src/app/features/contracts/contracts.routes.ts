import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContractsComponent } from "./contracts/contracts.component";

export const Contracts_Services: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'contracts',
        component: ContractsComponent
    },
]