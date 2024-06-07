import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { delay, dematerialize, map, materialize } from 'rxjs/operators';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/teamMembers`;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<any | null>;
    public user: Observable<any | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string): any {
        return this.http.get<any>(`${baseUrl}?memberName=${username}`)
            .pipe(map(user => {
                if (!user || user.length == 0) {
                    return null;
                }

                const userResponse = {
                    id: user[0].id,
                    memberName: user[0].memberName,
                    role: user[0].role,
                    token: `fake-jwt-token.${user[0].id}`
                };
                localStorage.setItem('user', JSON.stringify(userResponse));
                this.userSubject.next(userResponse);
                return userResponse;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    error(message: string): any {
        return throwError(() => ({ status: 400, error: { message } }))
            .pipe(materialize(), delay(500), dematerialize());
    }
}
