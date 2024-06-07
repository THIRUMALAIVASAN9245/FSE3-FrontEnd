import { Component } from '@angular/core';
import { Role } from './core/models/role';
import { TeamMember } from './shared/models/team-member';
import { AuthenticationService } from './core/services/authentication.service';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: TeamMember | null;
    title: string = 'sample-app';

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => {
            this.user = x
        });
    }

    get isManager() {
        return this.user?.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
    }
}