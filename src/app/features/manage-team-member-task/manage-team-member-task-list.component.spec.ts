// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ManageTeamMemberTaskService } from "@app/shared/services/manage-team-member-task.service";
import { of } from "rxjs";
import { ManageTeamMemberTaskListComponent } from "./manage-team-member-task-list.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { TeamMemberTask } from "@app/shared/models/team-member-task";

describe("ManageTeamMemberTaskListComponent", () => {
    let component: ManageTeamMemberTaskListComponent;
    let fixture: ComponentFixture<ManageTeamMemberTaskListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ManageTeamMemberTaskListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [ManageTeamMemberTaskService]
        });

        fixture = TestBed.createComponent(ManageTeamMemberTaskListComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should create the ManageTeamMemberTaskListComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });

    it("should call ngOnInit and get team member task details verify", () => {
        let taskList: any[] = [
            {
                "teamMemberName": "Thiru Srinivasan",
                "teamMemberId": "1",
                "taskName": "zxczxczxc",
                "deliverables": "zxczxcxcz",
                "taskStartDate": "2024-06-11",
                "taskEndDate": "2024-06-28",
                "id": 1
            },
            {
                "teamMemberName": "Test User",
                "teamMemberId": "2",
                "taskName": "cxzczxcxzc",
                "deliverables": "sadfasdasdsad",
                "taskStartDate": "2024-06-21",
                "taskEndDate": "2024-06-27",
                "id": 2
            },
            {
                "teamMemberName": "Thiru Srinivasan",
                "teamMemberId": "1",
                "taskName": "sdfsdfsdfsd",
                "deliverables": "dsdfsdsdfsdf",
                "taskStartDate": "2024-06-19",
                "taskEndDate": "2024-06-26",
                "id": 3
            }
        ];
        spyOn(component["manageTeamMemberTaskService"], "getTeamMemberTaskAll").and.returnValue(of(taskList));

        component.ngOnInit();

        expect(component.teamMemberTasks?.length).toBe(3);
    });


    it("should call ngOnInit and get team member task details call delete", () => {
        component.teamMemberTasks = [
            {
                teamMemberName: "Thiru Srinivasan",
                taskName: "sdfsdfsdfsd",
                deliverables: "dsdfsdsdfsdf",
                id: 1,
                taskEndDate: new Date(),
                taskStartDate:  new Date(),
                teamMemberId: 1
            },
            {
                teamMemberName: "Thiru Srinivasan",
                taskName: "sdfsdfsdfsd",
                deliverables: "dsdfsdsdfsdf",
                id: 2,
                taskEndDate: new Date(),
                taskStartDate:  new Date(),
                teamMemberId: 1
            },
            {
                teamMemberName: "Thiru Srinivasan 1",
                taskName: "sdfsdfsdfsd",
                deliverables: "dsdfsdsdfsdf",
                id: 3,
                taskEndDate: new Date(),
                taskStartDate:  new Date(),
                teamMemberId: 2
            }
        ];
        spyOn(component["manageTeamMemberTaskService"], "deleteTeamMemberTask").and.returnValue(of({} as TeamMemberTask));

        component.deleteUser(2);

        expect(component.teamMemberTasks?.length).toBe(2);
    });
});
