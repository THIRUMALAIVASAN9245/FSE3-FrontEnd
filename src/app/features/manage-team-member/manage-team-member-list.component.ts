import { Component, OnInit } from '@angular/core';
import { TeamMember } from '@app/shared/models/team-member';
import { ManageTeamMemberService } from '@app/shared/services/manage-team-member.service';
import { first } from 'rxjs/operators';


@Component({ templateUrl: 'manage-team-member-list.component.html' })
export class ManageTeamMemberListComponent implements OnInit {
    teamMembers?: TeamMember[] | any[];
    searchString: string = '';

    constructor(private manageTeamMemberService: ManageTeamMemberService) { }

    ngOnInit() {
        this.manageTeamMemberService.getTeamMemberAll()
            .pipe(first())
            .subscribe(teamMember => {
                        this.teamMembers = teamMember
            });
    }

    deleteUser(id: number) {
        this.manageTeamMemberService.deleteTeamMember(id)
            .pipe(first())
            .subscribe(() => this.teamMembers = this.teamMembers!.filter(x => x.id !== id));
    }
}