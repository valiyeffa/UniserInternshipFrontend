import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RailwayOrdersComponent } from "./railway-orders/railway-orders.component";

export const Orders_Routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'railwayOrders',
        component: RailwayOrdersComponent
    },

]