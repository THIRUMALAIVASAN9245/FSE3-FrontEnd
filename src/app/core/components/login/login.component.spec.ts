// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { of } from "rxjs";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AuthenticationService } from "@app/core/services/authentication.service";
import { Role } from "@app/core/models/role";
import { LoginComponent } from "./login.component";
import { SharedModule } from "@app/shared/shared.module";
import { ActivatedRoute } from "@angular/router";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    const userResponse = {
        id: 1,
        memberName: "memberName",
        role: Role.Admin,
        token: `fake-jwt-token. 1`
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, SharedModule],
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
                    logout: () => { },
                    login: () => {return of(userResponse)}
                }
            },
            {
                provide: ActivatedRoute,
                useValue: { snapshot: { params: { 'id': 1 }, queryParams: { returnUrl : '/' } } }
            }]
        });

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        spyOn(component["router"], "navigateByUrl").and.callFake;
        fixture.detectChanges();
    });

    it("should create the LoginComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });

    it("should get form values", () => {
        //act
        component.ngOnInit();
        component.loginForm.patchValue({ username: "test", password: "password" });

        // assert
        let form = component.f;
        expect(form.username.value).toBe('test');
    });

    it("should call onSubmit with vlaid form ", () => {
        //act
        component.ngOnInit();
        component.loginForm.patchValue({ username: "test", password: "password" });

        component.onSubmit();

        // assert
        expect(component.loginForm.valid).toBeTruthy();
    });

    it("should call onSubmit with invalid form", () => {
        //act
        component.ngOnInit();
        component.loginForm.patchValue({ username: "test" });

        component.onSubmit();

        // assert
        expect(component.loginForm.valid).toBeFalsy();
    });
});
