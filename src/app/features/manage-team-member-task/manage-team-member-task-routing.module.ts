import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTeamMemberTaskLayoutComponent } from './manage-team-member-task-layout.component';
import { ManageTeamMemberTaskListComponent } from './manage-team-member-task-list.component';
import { ManageTeamMemberTaskAddEditComponent } from './manage-team-member-task-add-edit.component';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { Role } from '@app/core/models/role';

const routes: Routes = [
    {
        path: '', component: ManageTeamMemberTaskLayoutComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
        children: [
            { path: '', component: ManageTeamMemberTaskListComponent },
            { path: 'manage-team-member-task-add', component: ManageTeamMemberTaskAddEditComponent },
            { path: 'manage-team-member-task-edit/:id', component: ManageTeamMemberTaskAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageTeamMemberTaskRoutingModule { }