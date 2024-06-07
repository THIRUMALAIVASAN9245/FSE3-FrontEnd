import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TeamMember } from '../models/team-member';
import { TeamMemberTask } from '../models/team-member-task';
import { Observable, catchError, of } from 'rxjs';

const baseUrl = `${environment.apiUrl}/teamMembers`;

@Injectable({ providedIn: 'root' })
export class ManageTeamMemberService {
    constructor(private http: HttpClient) { }

    getTeamMemberAll(): Observable<TeamMember[]> {
        return this.http
            .get<TeamMember[]>(`${baseUrl}?_sort=numberOfExp&_order=desc`)
            .pipe(catchError(this.handleError<TeamMember[]>('getTeamMemberAll', [])));
    }

    getTeamMemberById(id: number): Observable<TeamMember> {
        return this.http
            .get<TeamMember>(`${baseUrl}/${id}`)
            .pipe(catchError(this.handleError<TeamMember>('getTeamMemberById', {} as TeamMember)));
    }

    createTeamMember(params: any): Observable<TeamMember> {
        return this.http
            .post<TeamMember>(`${baseUrl}`, params)
            .pipe(catchError(this.handleError<TeamMember>('createTeamMember', {} as TeamMember)));
    }

    updateTeamMember(id: number, params: any): Observable<TeamMember> {
        return this.http
            .put<TeamMember>(`${baseUrl}/${id}`, params)
            .pipe(catchError(this.handleError<TeamMember>('updateTeamMember', {} as TeamMember)));
    }

    deleteTeamMember(id: number): Observable<TeamMember> {
        return this.http
            .delete<TeamMember>(`${baseUrl}/${id}`)
            .pipe(catchError(this.handleError<TeamMember>('deleteTeamMember', {} as TeamMember)));
    }

    getTeamMemberListAll(): Observable<TeamMember[]> {
        return this.http
            .get<TeamMember[]>(`${baseUrl}?_sort=memberName&_order=asc`)
            .pipe(catchError(this.handleError<TeamMember[]>('getTeamMemberListAll', [])));
    }

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
}