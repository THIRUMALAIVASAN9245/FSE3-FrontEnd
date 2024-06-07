// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ManageTeamMemberTaskService } from "@app/shared/services/manage-team-member-task.service";
import { of } from "rxjs";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AuthenticationService } from "@app/core/services/authentication.service";
import { SharedModule } from "@app/shared/shared.module";
import { ManageTeamMemberAddEditComponent } from "./manage-team-member-add-edit.component";
import { ManageTeamMemberService } from "@app/shared/services/manage-team-member.service";
import { AlertService } from "@app/core/services/alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TeamMember } from "@app/shared/models/team-member";
import { Role } from "@app/core/models/role";

describe("ManageTeamMemberAddEditComponent - Update", () => {
    let component: ManageTeamMemberAddEditComponent;
    let fixture: ComponentFixture<ManageTeamMemberAddEditComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ManageTeamMemberAddEditComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [
                ManageTeamMemberService, AlertService,
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { params: { 'id': 1 } } }
                }
            ]
        });

        fixture = TestBed.createComponent(ManageTeamMemberAddEditComponent);
        component = fixture.componentInstance;
        const mockmember1: TeamMember = {
            id: 3,
            memberName: 'memberName 3',
            numberOfExp: "5",
            additionalInfo: "additionalInfo",
            allocationPercentage: 100,
            projectEndDate: new Date(),
            projectStartDate: new Date(),
            role: Role.User,
            skillSets: "sdfsdf, sdfsdf, sdfsdf, sdfsdf"
        };
        spyOn(component["manageTeamMemberService"], "getTeamMemberById").and.returnValue(of(mockmember1));
        spyOn(component["manageTeamMemberService"], "createTeamMember").and.returnValue(of(mockmember1));
        spyOn(component["manageTeamMemberService"], "updateTeamMember").and.returnValue(of(mockmember1));
        spyOn(component["alertService"], "success").and.returnValue();
        spyOn(component["router"], "navigateByUrl").and.callFake;
        fixture.detectChanges();
    });

    it("should create the ManageTeamMemberAddEditComponent", () => {
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
        expect(formControl.memberName.value).toBe('memberName 3');
    });

    it("should call onSubmit", () => {
        //init
         component.ngOnInit();

         // act
         component.onSubmit();
 
         // assert
         expect(component['manageTeamMemberService'].updateTeamMember).toHaveBeenCalled();
     });
});

describe("ManageTeamMemberAddEditComponent - Create", () => {
    let component: ManageTeamMemberAddEditComponent;
    let fixture: ComponentFixture<ManageTeamMemberAddEditComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ManageTeamMemberAddEditComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [
                ManageTeamMemberService, AlertService,
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { params: { } } }
                }
            ]
        });

        fixture = TestBed.createComponent(ManageTeamMemberAddEditComponent);
        component = fixture.componentInstance;
        const mockmember1: TeamMember = {
            id: 3,
            memberName: 'memberName 3',
            numberOfExp: "5",
            additionalInfo: "additionalInfo",
            allocationPercentage: 100,
            projectEndDate: new Date(),
            projectStartDate: new Date(),
            role: Role.User,
            skillSets: "sdfsdf, sdfsdf, sdfsdf, sdfsdf"
        };
        spyOn(component["manageTeamMemberService"], "getTeamMemberById").and.returnValue(of(mockmember1));
        spyOn(component["manageTeamMemberService"], "createTeamMember").and.returnValue(of(mockmember1));
        spyOn(component["manageTeamMemberService"], "updateTeamMember").and.returnValue(of(mockmember1));
        spyOn(component["alertService"], "success").and.returnValue();
        spyOn(component["router"], "navigateByUrl").and.callFake;
        fixture.detectChanges();
    });

    it("should create the ManageTeamMemberAddEditComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });

    it("should call onSubmit with invalid form", () => {
        //init
         component.ngOnInit();
         component.form.patchValue({
            id: 3,
            memberName: 'memberName 3',
            numberOfExp: "2",
            additionalInfo: "additionalInfo",
            allocationPercentage: 100,
            projectEndDate: new Date(),
            projectStartDate: new Date(),
            role: Role.User,
            skillSets: "sdfsdf, sdfsdf, sdfsdf, sdfsdf"
        });

         // act
         component.onSubmit();
 
         // assert
         expect(component.form.invalid).toBeTruthy();
     });

     it("should call onSubmit with valid form", () => {
        //init
         component.ngOnInit();
         component.form.patchValue({
            id: 3,
            memberName: 'memberName 3',
            numberOfExp: "4",
            additionalInfo: "additionalInfo",
            allocationPercentage: 100,
            projectEndDate: new Date(),
            projectStartDate: new Date(),
            role: Role.User,
            skillSets: "sdfsdf, sdfsdf, sdfsdf, sdfsdf"
        });

         // act
         component.onSubmit();
 
         // assert
         expect(component.form.invalid).toBeFalsy();
         expect(component['manageTeamMemberService'].createTeamMember).toHaveBeenCalled();
     });
});
