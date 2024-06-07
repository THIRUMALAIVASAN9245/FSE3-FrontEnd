// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ManageTeamMemberTaskService } from "@app/shared/services/manage-team-member-task.service";
import { of } from "rxjs";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ViewTeamMemberTaskListComponent } from "./view-team-member-task-list.component";
import { AuthenticationService } from "@app/core/services/authentication.service";
import { SharedModule } from "@app/shared/shared.module";
import { Role } from "@app/core/models/role";

describe("ViewTeamMemberTaskListComponent", () => {
    let component: ViewTeamMemberTaskListComponent;
    let fixture: ComponentFixture<ViewTeamMemberTaskListComponent>;
    const userResponse = {
        id: 1,
        memberName: "memberName",
        role: Role.Admin,
        token: `fake-jwt-token. 1`
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ViewTeamMemberTaskListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [ManageTeamMemberTaskService,
                {
                    provide: AuthenticationService,
                    useValue: { userValue: of(userResponse) } 
                }]
        });

        fixture = TestBed.createComponent(ViewTeamMemberTaskListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the ViewTeamMemberTaskListComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });

    it("should call ngOnInit and get team member task details item", () => {
        let taskList: any[] = [
            {
                "teamMemberName": "Thiru Srinivasan",
                "teamMemberId": "1",
                "taskName": "zxczxczxc",
                "deliverables": "zxczxcxcz",
                "taskStartDate": "2024-06-11",
                "taskEndDate": "2024-06-28",
                "id": 1,
                "role": Role.Admin
            },
            {
                "teamMemberName": "Test User",
                "teamMemberId": "2",
                "taskName": "cxzczxcxzc",
                "deliverables": "sadfasdasdsad",
                "taskStartDate": "2024-06-21",
                "taskEndDate": "2024-06-27",
                "id": 2,
                "role": Role.Admin
            },
            {
                "teamMemberName": "Thiru Srinivasan",
                "teamMemberId": "1",
                "taskName": "sdfsdfsdfsd",
                "deliverables": "dsdfsdsdfsdf",
                "taskStartDate": "2024-06-19",
                "taskEndDate": "2024-06-26",
                "id": 3,
                "role": Role.Admin
            }
        ];
        spyOn(component["manageTeamMemberTaskService"], "getTeamMemberTaskByTeamMenberId").and.returnValue(of(taskList));
        
        // localStorage.setItem('user', JSON.stringify(userResponse));
        // spyOn(component["authenticationService"], "userValue").and.returnValue({ role: Role.Admin, id: 1 });

        component.ngOnInit();

        expect(component.teamMemberTasks?.length).toBe(3);
        // localStorage.removeItem('user');
    });
});
