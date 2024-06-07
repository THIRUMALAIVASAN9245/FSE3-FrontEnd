import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTeamMemberLayoutComponent } from './manage-team-member-layout.component';
import { ManageTeamMemberListComponent } from './manage-team-member-list.component';
import { ManageTeamMemberAddEditComponent } from './manage-team-member-add-edit.component';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { Role } from '@app/core/models/role';

const routes: Routes = [
    {
        path: '', component: ManageTeamMemberLayoutComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
        children: [
            { path: '', component: ManageTeamMemberListComponent },
            { path: 'manage-team-member-add', component: ManageTeamMemberAddEditComponent },
            { path: 'manage-team-member-edit/:id', component: ManageTeamMemberAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageTeamMemberRoutingModule { }