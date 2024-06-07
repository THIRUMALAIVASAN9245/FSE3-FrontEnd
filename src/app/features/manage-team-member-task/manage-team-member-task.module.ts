import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ManageTeamMemberTaskRoutingModule } from './manage-team-member-task-routing.module';
import { ManageTeamMemberTaskLayoutComponent } from './manage-team-member-task-layout.component';
import { ManageTeamMemberTaskAddEditComponent } from './manage-team-member-task-add-edit.component';
import { ManageTeamMemberTaskListComponent } from './manage-team-member-task-list.component';
// import { SearchNamePipeTask } from '@app/shared/helper/search-name-task.pipe';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ManageTeamMemberTaskRoutingModule
    ],
    declarations: [
        // SearchNamePipeTask,
        ManageTeamMemberTaskLayoutComponent,
        ManageTeamMemberTaskListComponent,
        ManageTeamMemberTaskAddEditComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ManageTeamMemberTaskModule { }