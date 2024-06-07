
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { Role } from './core/models/role';
import { ViewTeamMemberTaskListComponent } from './features/view-team-member-task/view-team-member-task-list.component';

const manageTeamMemberModule = () => import('./features/manage-team-member/manage-team-member.module').then(x => x.ManageTeamMemberModule);
const manageTeamMemberTaskModule = () => import('./features/manage-team-member-task/manage-team-member-task.module').then(x => x.ManageTeamMemberTaskModule);

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: ViewTeamMemberTaskListComponent,  canActivate: [AuthGuard] },
    { path: '', component: ViewTeamMemberTaskListComponent,  canActivate: [AuthGuard] },
    { path: 'manage-team-member', loadChildren: manageTeamMemberModule },
    { path: 'manage-team-member-task', loadChildren: manageTeamMemberTaskModule },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
