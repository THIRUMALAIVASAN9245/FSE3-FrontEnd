import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { AlertService } from './alert.service';

describe('AlertService', () => {
    let service: AlertService;
    let httpController: HttpTestingController;
    let url = environment.apiUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(AlertService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call success and verify', () => {

        service.success('Team Member saved', { keepAfterRouteChange: true, autoClose: true });

        service.onAlert().subscribe(alert => {
            expect(alert.message).toBe('Team Member saved');
        });
    });

    it('should call error and verify', () => {

        service.error('Error Team Member saved', { keepAfterRouteChange: true, autoClose: true });

        service.onAlert().subscribe(alert => {
            expect(alert.message).toBe('Error Team Member saved');
        });
    });

    it('should call info and verify', () => {

        service.info('info Team Member saved', { keepAfterRouteChange: true, autoClose: true });

        service.onAlert().subscribe(alert => {
            expect(alert.message).toBe('info Team Member saved');
        });
    });

    it('should call warn and verify', () => {

        service.warn('warn Team Member saved', { id: "1", keepAfterRouteChange: true, autoClose: true });

        service.onAlert("1").subscribe(alert => {
            expect(alert.message).toBe('warn Team Member saved');
        });
    });
});
