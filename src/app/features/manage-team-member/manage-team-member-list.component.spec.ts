// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { of } from "rxjs";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ManageTeamMemberService } from "@app/shared/services/manage-team-member.service";
import { ManageTeamMemberListComponent } from "./manage-team-member-list.component";
import { SharedModule } from "@app/shared/shared.module";
import { TeamMember } from "@app/shared/models/team-member";
import { Role } from "@app/core/models/role";

describe("ManageTeamMemberListComponent", () => {
    let component: ManageTeamMemberListComponent;
    let fixture: ComponentFixture<ManageTeamMemberListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ManageTeamMemberListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [ManageTeamMemberService]
        });

        fixture = TestBed.createComponent(ManageTeamMemberListComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should create the ManageTeamMemberListComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });

    it("should call ngOnInit and get team member details", () => {
        let taskList: any[] = [
            {
                "memberName": "Thiru Srinivasan",
                "projectStartDate": "2024-06-11",
                "projectEndDate": "2024-06-28",
                "id": 1,
                "role": Role.Admin
            },
            {
                "memberName": "Test User",
                "projectStartDate": "2024-06-11",
                "projectEndDate": "2024-06-28",
                "id": 2,
                "role": Role.Admin
            },
            {
                "memberName": "Test User New",
                "projectStartDate": "2024-06-11",
                "projectEndDate": "2024-06-28",
                "id": 3,
                "role": Role.Admin
            }
        ];
        spyOn(component["manageTeamMemberService"], "getTeamMemberAll").and.returnValue(of(taskList));

        component.ngOnInit();

        expect(component.teamMembers?.length).toBe(3);
    });


    it("should call ngOnInit and get team member task details", () => {
        component.teamMembers = [
            {
                "memberName": "Thiru Srinivasan",
                "projectStartDate": "2024-06-11",
                "projectEndDate": "2024-06-28",
                "id": 1,
                "role": Role.Admin
            },
            {
                "memberName": "Test User",
                "projectStartDate": "2024-06-11",
                "projectEndDate": "2024-06-28",
                "id": 2,
                "role": Role.Admin
            },
            {
                "memberName": "Test User New",
                "projectStartDate": "2024-06-11",
                "projectEndDate": "2024-06-28",
                "id": 3,
                "role": Role.Admin
            }
        ];
        spyOn(component["manageTeamMemberService"], "deleteTeamMember").and.returnValue(of({} as TeamMember));

        component.deleteUser(2);

        expect(component.teamMembers?.length).toBe(2);
    });
});
