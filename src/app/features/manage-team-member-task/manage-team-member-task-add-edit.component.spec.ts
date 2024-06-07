// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ManageTeamMemberTaskService } from "@app/shared/services/manage-team-member-task.service";
import { of } from "rxjs";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AuthenticationService } from "@app/core/services/authentication.service";
import { SharedModule } from "@app/shared/shared.module";
import { ManageTeamMemberService } from "@app/shared/services/manage-team-member.service";
import { AlertService } from "@app/core/services/alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TeamMember } from "@app/shared/models/team-member";
import { Role } from "@app/core/models/role";
import { ManageTeamMemberTaskAddEditComponent } from "./manage-team-member-task-add-edit.component";
import { TeamMemberTask } from "@app/shared/models/team-member-task";
import { ConstantPool } from "@angular/compiler";

describe("ManageTeamMemberTaskAddEditComponent - Update", () => {
    let component: ManageTeamMemberTaskAddEditComponent;
    let fixture: ComponentFixture<ManageTeamMemberTaskAddEditComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ManageTeamMemberTaskAddEditComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [
                ManageTeamMemberService, ManageTeamMemberTaskService, AlertService,
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { params: { 'id': 1 } } }
                }
            ]
        });

        fixture = TestBed.createComponent(ManageTeamMemberTaskAddEditComponent);
        component = fixture.componentInstance;
        const mockmemberTask1: TeamMemberTask = {
            id: 1,
            teamMemberName: 'memberName 2',
            teamMemberId: 1,
            taskStartDate: new Date(),
            taskEndDate: new Date(),
            taskName: "test",
            deliverables: "test"
        };
        const mockmember1: TeamMember = {
            id: 1,
            memberName: 'memberName 3',
            numberOfExp: "5",
            additionalInfo: "additionalInfo",
            allocationPercentage: 100,
            projectEndDate: new Date(),
            projectStartDate: new Date(),
            role: Role.User,
            skillSets: "sdfsdf, sdfsdf, sdfsdf, sdfsdf"
        };
        spyOn(component["manageTeamMemberService"], "getTeamMemberListAll").and.returnValue(of([mockmember1]));
        spyOn(component["manageTeamMemberService"], "getTeamMemberById").and.returnValue(of(mockmember1));
        spyOn(component["manageTeamMemberTaskService"], "getTeamMemberTaskById").and.returnValue(of(mockmemberTask1));
        spyOn(component["manageTeamMemberTaskService"], "createTeamMemberTask").and.returnValue(of(mockmemberTask1));
        spyOn(component["manageTeamMemberTaskService"], "updateTeamMemberTask").and.returnValue(of(mockmemberTask1));
        spyOn(component["alertService"], "success").and.returnValue();
        spyOn(component["router"], "navigateByUrl").and.callFake;
        fixture.detectChanges();
    });

    it("should create the ManageTeamMemberTaskAddEditComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });

    it("should verify id", () => {
        // assert
        expect(component.id).toBe(1);
    });

    it("should get form control", () => {
        //act
        component.ngOnInit();

        // assert
        let formControl = component.f;
        expect(formControl.teamMemberName.value).toBe('memberName 3');
    });

    it("should call onSubmit", () => {
        //init
        component.ngOnInit();

        // act
        component.onSubmit();

        // assert
        expect(component['manageTeamMemberTaskService'].updateTeamMemberTask).toHaveBeenCalled();
    });
});

describe("ManageTeamMemberTaskAddEditComponent - Create", () => {
    let component: ManageTeamMemberTaskAddEditComponent;
    let fixture: ComponentFixture<ManageTeamMemberTaskAddEditComponent>;
    const mockmemberTask1: TeamMemberTask = {
        id: 1,
        teamMemberName: 'memberName 2',
        teamMemberId: 1,
        taskStartDate: new Date(),
        taskEndDate: new Date(),
        taskName: "test",
        deliverables: "test"
    };
    let mockmember1: TeamMember = {
        id: 1,
        memberName: 'memberName 3',
        numberOfExp: "5",
        additionalInfo: "additionalInfo",
        allocationPercentage: 100,
        projectEndDate: new Date('2024-10-06'),
        projectStartDate: new Date('2024-05-06'),
        role: Role.User,
        skillSets: "sdfsdf, sdfsdf, sdfsdf, sdfsdf"
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ManageTeamMemberTaskAddEditComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [
                ManageTeamMemberService, AlertService,
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { params: {} } }
                }
            ]
        });

        fixture = TestBed.createComponent(ManageTeamMemberTaskAddEditComponent);
        component = fixture.componentInstance;
        spyOn(component["manageTeamMemberService"], "getTeamMemberById").and.returnValue(of(mockmember1));
        spyOn(component["manageTeamMemberService"], "getTeamMemberListAll").and.returnValue(of([mockmember1]));
        spyOn(component["manageTeamMemberTaskService"], "getTeamMemberTaskById").and.returnValue(of(mockmemberTask1));
        spyOn(component["manageTeamMemberTaskService"], "createTeamMemberTask").and.returnValue(of(mockmemberTask1));
        spyOn(component["manageTeamMemberTaskService"], "updateTeamMemberTask").and.returnValue(of(mockmemberTask1));
        spyOn(component["alertService"], "success").and.returnValue();
        spyOn(component["router"], "navigateByUrl").and.callFake;
        fixture.detectChanges();
    });

    it("should create the ManageTeamMemberTaskAddEditComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });

    it("should call onSubmit with invalid form", () => {
        //init
        component.ngOnInit();
        component.form.patchValue({
            id: 1,
            teamMemberName: 'memberName 2',
            teamMemberId: 1,
            taskStartDate: new Date(),
            taskEndDate: new Date(),
            deliverables: "test"
        });

        // act
        component.onSubmit();

        // assert
        expect(component.form.invalid).toBeTruthy();
    });

    it("should call onSubmit with valid form", () => {
        //init
        component.ngOnInit();
        component.teammemberInfo = mockmember1;
        component.form.patchValue({
            id: 1,
            teamMemberName: 'memberName 2',
            teamMemberId: 1,
            taskStartDate: new Date('2024-06-06'),
            taskEndDate: new Date('2024-06-07'),
            taskName: "test",
            deliverables: "test"
        });

        // act
        component.onSubmit();

        // assert
        expect(component.form.invalid).toBeFalsy();
        expect(component['manageTeamMemberTaskService'].createTeamMemberTask).toHaveBeenCalled();
    });

    it("should call onChange", () => {
        //init
        component.ngOnInit();
        component.form.patchValue({
            teamMemberId: 1
        });

        // act
        component.onChange();

        // assert
        expect(component.teammemberInfo.memberName).toBe('memberName 3');
    });
});
