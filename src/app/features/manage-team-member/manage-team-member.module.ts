import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManageTeamMemberRoutingModule } from './manage-team-member-routing.module';
import { ManageTeamMemberLayoutComponent } from './manage-team-member-layout.component';
import { ManageTeamMemberAddEditComponent } from './manage-team-member-add-edit.component';
import { ManageTeamMemberListComponent } from './manage-team-member-list.component';
import { CheckboxGroupComponent } from '@app/shared/directive/checkbox-group.component';
import { CheckboxComponent } from '@app/shared/directive/checkbox.component';
import { PercentageDirective } from '@app/shared/directive/percentage.directive';
// import { SearchNamePipe } from '@app/shared/helper/search-name.pipe';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ManageTeamMemberRoutingModule
    ],
    declarations: [
        PercentageDirective,
        // SearchNamePipe,
        CheckboxGroupComponent,
        CheckboxComponent,
        ManageTeamMemberLayoutComponent,
        ManageTeamMemberListComponent,
        ManageTeamMemberAddEditComponent
    ]
})
export class ManageTeamMemberModule { }