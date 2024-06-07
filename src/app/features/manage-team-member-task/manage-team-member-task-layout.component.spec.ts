// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ManageTeamMemberTaskLayoutComponent } from "./manage-team-member-task-layout.component";

describe("ManageTeamMemberTaskLayoutComponent", () => {
    let component: ManageTeamMemberTaskLayoutComponent;
    let fixture: ComponentFixture<ManageTeamMemberTaskLayoutComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ManageTeamMemberTaskLayoutComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: []
        });

        fixture = TestBed.createComponent(ManageTeamMemberTaskLayoutComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should create the ManageTeamMemberTaskLayoutComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });
});
