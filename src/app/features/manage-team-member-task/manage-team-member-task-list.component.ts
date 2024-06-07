import { Component, OnInit } from '@angular/core';
import { TeamMemberTask } from '@app/shared/models/team-member-task';
import { ManageTeamMemberTaskService } from '@app/shared/services/manage-team-member-task.service';
import { first } from 'rxjs/operators';


@Component({ templateUrl: 'manage-team-member-task-list.component.html' })
export class ManageTeamMemberTaskListComponent implements OnInit {
    teamMemberTasks?: TeamMemberTask[];
    searchString: string = '';

    constructor(private manageTeamMemberTaskService: ManageTeamMemberTaskService) { }

    ngOnInit() {
        this.manageTeamMemberTaskService.getTeamMemberTaskAll()
            .subscribe(teamMemberTask => {
                        this.teamMemberTasks = teamMemberTask
            });
    }

    deleteUser(id: number) {
        this.manageTeamMemberTaskService.deleteTeamMemberTask(id)
            .subscribe(() => this.teamMemberTasks = this.teamMemberTasks!.filter(x => x.id !== id));
    }
}