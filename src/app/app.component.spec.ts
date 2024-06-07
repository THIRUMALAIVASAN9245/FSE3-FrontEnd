// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { of } from "rxjs";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AuthenticationService } from "@app/core/services/authentication.service";
import { AppComponent } from "./app.component";
import { Role } from "./core/models/role";

describe("AppComponent", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    const userResponse = {
        id: 1,
        memberName: "memberName",
        role: Role.Admin,
        token: `fake-jwt-token. 1`
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [{
                provide: AuthenticationService,
                useValue: {
                    userValue: of({
                        id: 1,
                        memberName: "memberName",
                        role: Role.Admin,
                        token: `fake-jwt-token. 1`
                    }), 
                    user: of({
                        id: 1,
                        memberName: "memberName",
                        role: Role.Admin,
                        token: `fake-jwt-token. 1`
                    }),
                    logout: () => {}
                }
            }]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        // localStorage.setItem('user', JSON.stringify(userResponse));
        // spyOn(component["authenticationService"], "userValue").and.returnValue({ role: Role.Admin, id: 1 });
        fixture.detectChanges();
    });

    it("should create the AppComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });

    it("should verify get team member details", () => {
        // localStorage.setItem('user', JSON.stringify(userResponse));
        // spyOn(component["authenticationService"], "userValue").and.returnValue({ role: Role.Admin, id: 1 });

        expect(component.user?.id).toBe(userResponse.id);
        expect(component.user?.memberName).toBe(userResponse.memberName);
    });

    it("should verify isManager", () => {
        // localStorage.setItem('user', JSON.stringify(userResponse));
        // spyOn(component["authenticationService"], "userValue").and.returnValue({ role:Role.Admin, id: 1 });

        let role = component.isManager;

        expect(component.user?.role).toBe(<Role>userResponse.role);
    });

    it("should call logout", () => {
        // localStorage.setItem('user', JSON.stringify(userResponse));
        // spyOn(component["authenticationService"], "logout");

        let role = component.logout();

        expect(component).toBeTruthy();
    });
});
