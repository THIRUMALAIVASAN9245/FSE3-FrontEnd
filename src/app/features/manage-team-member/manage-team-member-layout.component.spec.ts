// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ManageTeamMemberLayoutComponent } from "./manage-team-member-layout.component";

describe("ManageTeamMemberLayoutComponent", () => {
    let component: ManageTeamMemberLayoutComponent;
    let fixture: ComponentFixture<ManageTeamMemberLayoutComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ManageTeamMemberLayoutComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: []
        });

        fixture = TestBed.createComponent(ManageTeamMemberLayoutComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should create the ManageTeamMemberLayoutComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });
});
