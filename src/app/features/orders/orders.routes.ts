import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RailwayOrdersComponent } from "./railway-orders/railway-orders.component";
import { CreateformComponent } from "./railway-orders/crate-steps/createform/createform.component";
import { EditformComponent } from "./railway-orders/editform/editform.component";
import { CrateStepsComponent } from "./railway-orders/crate-steps/crate-steps.component";

export const Orders_Routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'railwayOrders',
        component: RailwayOrdersComponent,
    },
    {
        path: 'railwayOrders/new-railwayOrders',
        component: CrateStepsComponent
    },
    {
        path: 'railwayOrders/edit/:id',
        component: EditformComponent
    },

]