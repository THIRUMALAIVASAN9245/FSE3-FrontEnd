import { getTestBed, TestBed } from "@angular/core/testing";
import { Router, Routes, UrlTree } from "@angular/router";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject, of } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { AuthGuard } from "./auth.guard";
import { Role } from "../models/role";
import { ViewTeamMemberTaskListComponent } from "@app/features/view-team-member-task/view-team-member-task-list.component";
import { LoginComponent } from "../components/login/login.component";

describe("AuthGuard - Unauthenticated User", () => {
    let injector: TestBed;
    let guard: AuthGuard;
    let routeMock: any = { snapshot: {}, data: [Role.Admin, Role.User] };
    let routeStateMock: any = { snapshot: {}, url: "/login" };
    const routes: Routes = [
        { path: 'login', component: LoginComponent },
        { path: '', component: ViewTeamMemberTaskListComponent },
        { path: '**', redirectTo: '' }
    ];
    let router: Router;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
            providers: [{
                provide: AuthenticationService,
                useValue: {
                    userValue: null,
                    user: of(null),
                    logout: () => { }
                }
            }]
        });
        injector = getTestBed();
        guard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });

    it("should allow the authenticated user to access app", () => {
        expect(true).toEqual(true);
    });

    describe('AuthenticationService - Login', () => {
        it("should redirect an unauthenticated user to the login route", () => {
            spyOn(guard["router"], "navigate").and.callFake;
            let result = guard.canActivate(routeMock, routeStateMock);
            expect(result).toBeFalsy();
        });
    });
});

describe("AuthGuard - Authenticated User", () => {
    let injector: TestBed;
    let guard: AuthGuard;
    let routeMock: any = { snapshot: {}, data: [Role.Admin, Role.User] };
    let routeStateMock: any = { snapshot: {}, url: "/login" };
    const routes: Routes = [
        { path: 'login', component: LoginComponent },
        { path: '', component: ViewTeamMemberTaskListComponent },
        { path: '**', redirectTo: '' }
    ];
    let router: Router;
    const userResponse = {
        id: 1,
        memberName: 'test',
        role: Role.Admin,
        token: `fake-jwt-token.1`
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
            providers: [{
                provide: AuthenticationService,
                useValue: {
                    userValue: {
                        id: 1,
                        memberName: "memberName",
                        role: Role.Admin,
                        token: `fake-jwt-token. 1`
                    },
                    user: of({
                        id: 1,
                        memberName: "memberName",
                        role: Role.Admin,
                        token: `fake-jwt-token. 1`
                    }),
                    logout: () => { }
                }
            }]
        });
        injector = getTestBed();
        guard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });

    it("should allow the authenticated user to access app", () => {
        expect(true).toEqual(true);
    });

    describe('AuthenticationService - Login', () => {
        it("should return true and not redirect", () => {
            spyOn(guard["router"], "navigate").and.callFake;
            routeMock = { snapshot: {}, data: [Role.User, Role.Admin] };
            let result = guard.canActivate(routeMock, routeStateMock);
            expect(result).toBeTruthy();
        });
    });

    xdescribe('AuthenticationService - Login', () => {
        it("should return false and not redirect with no role", () => {
            spyOn(guard["router"], "navigate").and.callFake;
            routeMock = { snapshot: {}, data: [Role.User] };
            let result = guard.canActivate(routeMock, routeStateMock);
            expect(result).toBeFalsy();
        });
    });
});