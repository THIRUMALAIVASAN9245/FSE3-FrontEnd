import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './core/components/alert/alert.component';
import { LoginComponent } from './core/components/login/login.component';
import { ViewTeamMemberTaskListComponent } from './features/view-team-member-task/view-team-member-task-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        ViewTeamMemberTaskListComponent
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})

export class AppModule { }