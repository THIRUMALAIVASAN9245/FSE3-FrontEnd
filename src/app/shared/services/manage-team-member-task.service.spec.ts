import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { Role } from '@app/core/models/role';
import { environment } from '@environments/environment';
import { of } from 'rxjs/internal/observable/of';
import { TeamMemberTask } from '../models/team-member-task';
import { ManageTeamMemberTaskService } from './manage-team-member-task.service';

describe('ManageTeamMemberTaskService', () => {
    let service: ManageTeamMemberTaskService;
    let httpController: HttpTestingController;

    const mockmember1: TeamMemberTask = {
        id: 1,
        teamMemberName: 'memberName 1',
        teamMemberId: 1,
        taskStartDate: new Date(),
        taskEndDate: new Date(),
        taskName: "test",
        deliverables: "test"
    };

    const mockmember2: TeamMemberTask = {
        id: 2,
        teamMemberName: 'memberName 2',
        teamMemberId: 1,
        taskStartDate: new Date(),
        taskEndDate: new Date(),
        taskName: "test",
        deliverables: "test"
    };

    const mockmember3: TeamMemberTask = {
        id: 3,
        teamMemberName: 'memberName 3',
        teamMemberId: 2,
        taskStartDate: new Date(),
        taskEndDate: new Date(),
        taskName: "test",
        deliverables: "test"
    };

    const mockmemberArray: TeamMemberTask[] = [mockmember1, mockmember2, mockmember3];

    let url = environment.apiUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(ManageTeamMemberTaskService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getTeamMemberTaskAll and return an array of team member task', () => {
        service.getTeamMemberTaskAll().subscribe((res) => {
            expect(res).toEqual(mockmemberArray);
        });

        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}/taskList`,
        });

        req.flush(mockmemberArray);
    });

    it('should call getTeamMemberTaskById and return an team member task', () => {
        service.getTeamMemberTaskById(1).subscribe((res) => {
            expect(res).toEqual(mockmemberArray[0]);
        });

        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}/taskList/1`,
        });

        req.flush(mockmemberArray[0]);
    });

    it('should call getTeamMemberTaskByTeamMenberId and return an team member task by team member id', () => {
        service.getTeamMemberTaskByTeamMenberId(1).subscribe((res) => {
            expect(res).toEqual(mockmemberArray);
        });

        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}/taskList?teamMemberId=1`,
        });

        req.flush(mockmemberArray);
    });

    it('should call createTeamMemberTask and return an team member task', () => {
        service.createTeamMemberTask(mockmemberArray[0]).subscribe((res) => {
            expect(res).toEqual(mockmemberArray[0]);
        });

        const req = httpController.expectOne({
            method: 'POST',
            url: `${url}/taskList`,
        });

        req.flush(mockmemberArray[0]);
    });

    it('should call updateTeamMemberTask and return an team member task', () => {
        service.updateTeamMemberTask(1, mockmemberArray[0]).subscribe((res) => {
            expect(res).toEqual(mockmemberArray[0]);
        });

        const req = httpController.expectOne({
            method: 'PUT',
            url: `${url}/taskList/1`,
        });

        req.flush(mockmemberArray[0]);
    });

    it('should call deleteTeamMemberTask and return an team member task', () => {
        service.deleteTeamMemberTask(1).subscribe((res) => {
            expect(res).toEqual(mockmemberArray[0]);
        });

        const req = httpController.expectOne({
            method: 'DELETE',
            url: `${url}/taskList/1`,
        });

        req.flush(mockmemberArray[0]);
    });

    it('should call getTeamMemberTaskAll and return error', () => {

        service.getTeamMemberTaskAll().subscribe({
            error(actualError) {
                expect(of(actualError)).toBeTruthy();
                expect(actualError).toBeTruthy();
            }
        });

        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}/taskList`,
        });
        req.flush({ operation: 'getTeamMemberTaskAll', errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' });
    });
});
