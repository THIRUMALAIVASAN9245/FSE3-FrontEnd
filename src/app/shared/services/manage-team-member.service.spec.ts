import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { Role } from '@app/core/models/role';
import { environment } from '@environments/environment';
import { of } from 'rxjs/internal/observable/of';
import { TeamMember } from '../models/team-member';
import { ManageTeamMemberService } from './manage-team-member.service';

describe('ManageTeamMemberService', () => {
    let service: ManageTeamMemberService;
    let httpController: HttpTestingController;

    const mockmember1: TeamMember = {
        id: 1,
        memberName: 'memberName 1',
        numberOfExp: "3",
        additionalInfo: "additionalInfo",
        allocationPercentage:100,
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
        allocationPercentage:100,
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
        allocationPercentage:100,
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
        service = TestBed.inject(ManageTeamMemberService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getTeamMemberAll and return an array of teamMembers', () => {
        service.getTeamMemberAll().subscribe((res) => {
            expect(res).toEqual(mockmemberArray);
        });

        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}/teamMembers?_sort=numberOfExp&_order=desc`,
        });

        req.flush(mockmemberArray);
    });

    it('should call getTeamMemberById and return an teamMember', () => {
        service.getTeamMemberById(1).subscribe((res) => {
            expect(res).toEqual(mockmemberArray[0]);
        });

        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}/teamMembers/1`,
        });

        req.flush(mockmemberArray[0]);
    });

    it('should call createTeamMember and return an teamMember', () => {
        service.createTeamMember(mockmemberArray[0]).subscribe((res) => {
            expect(res).toEqual(mockmemberArray[0]);
        });

        const req = httpController.expectOne({
            method: 'POST',
            url: `${url}/teamMembers`,
        });

        req.flush(mockmemberArray[0]);
    });

    it('should call updateTeamMember and return an teamMember', () => {
        service.updateTeamMember(1, mockmemberArray[0]).subscribe((res) => {
            expect(res).toEqual(mockmemberArray[0]);
        });

        const req = httpController.expectOne({
            method: 'PUT',
            url: `${url}/teamMembers/1`,
        });

        req.flush(mockmemberArray[0]);
    });

    it('should call deleteTeamMember and return an teamMember', () => {
        service.deleteTeamMember(1).subscribe((res) => {
            expect(res).toEqual(mockmemberArray[0]);
        });

        const req = httpController.expectOne({
            method: 'DELETE',
            url: `${url}/teamMembers/1`,
        });

        req.flush(mockmemberArray[0]);
    });

    it('should call getTeamMemberListAll and return an array of teamMember', () => {
        service.getTeamMemberListAll().subscribe((res) => {
            expect(res).toEqual(mockmemberArray);
        });

        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}/teamMembers?_sort=memberName&_order=asc`,
        });

        req.flush(mockmemberArray);
    });

    it('should call getTeamMemberListAll and return error', () => {

        service.getTeamMemberListAll().subscribe({
            error(actualError) {
                expect(of(actualError)).toBeTruthy();
                expect(actualError).toBeTruthy();
            }
        });

        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}/teamMembers?_sort=memberName&_order=asc`,
        });
        req.flush({ operation: 'getTeamMemberListAll' ,errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' });
    });
});
