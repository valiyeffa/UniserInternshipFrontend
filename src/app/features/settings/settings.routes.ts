import { Routes } from "@angular/router";
import { RolesComponent } from "./roles/roles.component";
import { UsersComponent } from "./users/users.component";
import { UsersFormComponent } from "./users/users-form/users-form.component";

export const Settings_Routes: Routes = [
    {
        path: 'roles',
        component: RolesComponent
    },
    {
        path: 'users',
        component: UsersComponent,
        title: 'Users',
    },
    {
        path: 'users/new-user',
        component: UsersFormComponent,
        title: 'Create user',
    },
    {
        path: 'users/edit-user/:id',
        component: UsersFormComponent,
        title: 'Edit user',
    },
    // {
    //     path: 'main',
    //     component: MainBodyComponent,
    //     title: 'Main Body',
    //     children: [
    //         {
    //             path: ':id',
    //             component: ContractsComponent
    //         }
    //     ],
    // },
]