// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { of } from "rxjs";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AuthenticationService } from "@app/core/services/authentication.service";
import { Role } from "@app/core/models/role";
import { SharedModule } from "@app/shared/shared.module";
import { ActivatedRoute } from "@angular/router";
import { AlertComponent } from "./alert.component";
import { AlertService } from "@app/core/services/alert.service";
import { AlertType, Alert } from "@app/core/models/alert";

describe("AlertComponent", () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AlertComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [AlertService, {
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
                    login: () => { return of({ id: 1 }) }
                }
            },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { params: { 'id': 1 }, queryParams: { returnUrl: '/' } } }
                }]
        });

        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        spyOn(component["router"], "navigateByUrl").and.callFake;
        fixture.detectChanges();
    });

    it("should create the AlertComponent", () => {
        // assert
        expect(component).toBeTruthy();
    });

    it("should verify cssClass for given alert model", () => {
        // arrange
        const alert = { type: AlertType.Success, fade: true } as Alert;

        // act
        let result = component.cssClass(alert);

        // assert
        expect(result).toBe('alert-success fade');
    });

    it("should verify cssClass with undefined", () => {
        // arrange
        const alert = { type: undefined, fade: true } as Alert;

        // act
        let result = component.cssClass(alert);

        // assert
        expect(result).toBeNull;
    });

    it("should call removeAlert", () => {
        // arrange
        const alert1 = { id: "1", type: AlertType.Success, fade: true } as Alert;
        const alert2 = { id: "2", type: AlertType.Success, fade: true } as Alert;
        component.alerts.push(alert1);
        component.alerts.push(alert2);

        // act
        component.removeAlert(alert1);

        // assert
        setTimeout(() => { expect(component.alerts.length).toBe(1); }, 1000);
    });

    it("should call ngOnInit with message", () => {
        // arrange
        const alert1 = { id: "1", type: AlertType.Success, fade: true, message: "amert message", autoClose: true } as Alert;
        spyOn(component["alertService"], "onAlert").and.returnValue(of(alert1));

        // act
        component.ngOnInit();

        // assert
        expect(component.alerts.length).toBe(1);
    });

    it("should call ngOnInit without message", () => {
        // arrange
        const alert1 = { id: "1", type: AlertType.Success, fade: true, keepAfterRouteChange: true } as Alert;
        const alert2 = { id: "2", type: AlertType.Success, fade: true, keepAfterRouteChange: true } as Alert;
        component.alerts.push(alert1);
        component.alerts.push(alert2);
        spyOn(component["alertService"], "onAlert").and.returnValue(of(alert1));

        // act
        component.ngOnInit();

        // assert
        expect(component.alerts.length).toBe(2);
    });
});
