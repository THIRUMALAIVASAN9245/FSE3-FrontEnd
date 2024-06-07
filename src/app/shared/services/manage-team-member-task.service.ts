import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TeamMemberTask } from '../models/team-member-task';
import { Observable, catchError, of } from 'rxjs';

const baseUrl = `${environment.apiUrl}/taskList`;

@Injectable({ providedIn: 'root' })
export class ManageTeamMemberTaskService {
    constructor(private http: HttpClient) { }
    
    getTeamMemberTaskAll(): Observable<TeamMemberTask[]> {
        return this.http
            .get<TeamMemberTask[]>(`${baseUrl}`)
            .pipe(catchError(this.handleError<TeamMemberTask[]>('getTeamMemberTaskAll', [])));
    }

    getTeamMemberTaskById(id: number): Observable<TeamMemberTask> {
        return this.http
            .get<TeamMemberTask>(`${baseUrl}/${id}`)
            .pipe(catchError(this.handleError<TeamMemberTask>('getTeamMemberTaskById', {} as TeamMemberTask)));
    }

    getTeamMemberTaskByTeamMenberId(id: any): Observable<TeamMemberTask[]> {
        return this.http
            .get<TeamMemberTask[]>(`${baseUrl}?teamMemberId=${id}`)
            .pipe(catchError(this.handleError<TeamMemberTask[]>('getTeamMemberTaskById', [])));
    }

    deleteTeamMemberTask(id: number): Observable<TeamMemberTask> {
        return this.http
            .delete<TeamMemberTask>(`${baseUrl}/${id}`)
            .pipe(catchError(this.handleError<TeamMemberTask>('deleteTeamMemberTask', {} as TeamMemberTask)));
    }

    createTeamMemberTask(params: any): Observable<TeamMemberTask> {
        return this.http
            .post<TeamMemberTask>(`${baseUrl}`, params)
            .pipe(catchError(this.handleError<TeamMemberTask>('createTeamMemberTask', {} as TeamMemberTask)));
    }

    updateTeamMemberTask(id: number, params: any): Observable<TeamMemberTask> {
        return this.http
            .put<TeamMemberTask>(`${baseUrl}/${id}`, params)
            .pipe(catchError(this.handleError<TeamMemberTask>('updateTeamMemberTask', {} as TeamMemberTask)));
    }

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
}