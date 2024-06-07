import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { Role } from '@app/core/models/role';
import { TeamMember } from '@app/shared/models/team-member';
import { environment } from '@environments/environment';
import { of } from 'rxjs/internal/observable/of';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let httpController: HttpTestingController;
    const userResponse = {
        id: 1,
        memberName: 'test',
        role: Role.Admin,
        token: `fake-jwt-token.1`
    };

    const mockmember1: TeamMember = {
        id: 1,
        memberName: 'memberName 1',
        numberOfExp: "3",
        additionalInfo: "additionalInfo",
        allocationPercentage: 100,
        projectEndDate: new Date(),
        projectStartDate: new Date(),
        role: Role.Admin,
        skillSets: "test"
    };

    const mockmember2: TeamMember = {
        id: 2,
        memberName: 'memberName 2',
        numberOfExp: "3",
        additionalInfo: "additionalInfo",
        allocationPercentage: 100,
        projectEndDate: new Date(),
        projectStartDate: new Date(),
        role: Role.User,
        skillSets: "test"
    };

    const mockmember3: TeamMember = {
        id: 3,
        memberName: 'memberName 3',
        numberOfExp: "3",
        additionalInfo: "additionalInfo",
        allocationPercentage: 100,
        projectEndDate: new Date(),
        projectStartDate: new Date(),
        role: Role.User,
        skillSets: "test"
    };

    const mockmemberArray: TeamMember[] = [mockmember1, mockmember2, mockmember3];

    let url = environment.apiUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(AuthenticationService);
        httpController = TestBed.inject(HttpTestingController);
        localStorage.setItem('user', JSON.stringify(userResponse));
    });

    afterEach(() => {
        httpController.verify();
        localStorage.removeItem('user');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call logout', () => {
        spyOn(service["router"], "navigate").and.callFake;

        service.logout();

        expect(service).toBeTruthy();
    });

    describe('AuthenticationService - userValue', () => {
        beforeEach(() => {
            localStorage.setItem('user', JSON.stringify(userResponse));
        });

        it('should get userValue', () => {
            spyOn(service["router"], "navigate").and.callFake;

            let response = <any>service.userValue;

            expect(service).toBeTruthy();
        });
    });

    describe('AuthenticationService - Login', () => {
        beforeEach(() => {
            localStorage.setItem('user', JSON.stringify(userResponse));
        });

        it('should call login and verify successful login', () => {
            spyOn(service["router"], "navigate").and.callFake;
            service.login("test", "test").subscribe((res: any) => {
                expect(res.memberName).toEqual('memberName 1');
            });

            const req = httpController.expectOne({
                method: 'GET',
                url: `${url}/teamMembers?memberName=test`,
            });

            req.flush(mockmemberArray);
        });

        it('should call login and verify error login', () => {
            spyOn(service["router"], "navigate").and.callFake;
            service.login("test", "test").subscribe({
                error: (error: string) => {
                    expect(error).not.toBeNull();
                }
            });

            const req = httpController.expectOne({
                method: 'GET',
                url: `${url}/teamMembers?memberName=test`,
            });

            req.flush([]);
        });
    });
});
