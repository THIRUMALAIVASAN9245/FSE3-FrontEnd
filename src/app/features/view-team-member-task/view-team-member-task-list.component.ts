import { Component } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ManageTeamMemberTaskService } from '@app/shared/services/manage-team-member-task.service';

@Component({ templateUrl: 'view-team-member-task-list.component.html' })
export class ViewTeamMemberTaskListComponent {
    loading = false;
    teamMember: any;
    teamMemberTasks?: any[];
    searchValue: any;

    constructor(
        private manageTeamMemberTaskService: ManageTeamMemberTaskService,
        private authenticationService: AuthenticationService
    ) {
        this.teamMember = <any>this.authenticationService.userValue;
    }

    ngOnInit() {
        this.loading = true;
        this.manageTeamMemberTaskService.getTeamMemberTaskByTeamMenberId(this.teamMember?.id).subscribe(teamMemberTask => {
            this.loading = false;
            this.teamMemberTasks = teamMemberTask;
        });
    }
}