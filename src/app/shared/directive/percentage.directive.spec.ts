import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PercentageDirective } from './percentage.directive';

@Component({
    selector: 'app-test',
    template: '<input appPercentageDirective>',
})
class TestComponent { }

describe('PercentageDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveElm: DebugElement;
    let directive: PercentageDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                PercentageDirective
            ],
            imports: [CommonModule, FormsModule, ReactiveFormsModule]
        }).createComponent(TestComponent);
        component = fixture.componentInstance;
        directiveElm = fixture.debugElement.query(By.directive(PercentageDirective));
        directive = directiveElm.injector.get(PercentageDirective);
        fixture.detectChanges();
    });

    it("should create the validatePercentageOnly", () => {
        // assert
        expect(directiveElm).toBeTruthy();
    });

    it('validatePercentageOnly call with keyCode = 1', () => {
        const eventInit: KeyboardEventInit = {
            keyCode: 1,
            ctrlKey: false
        };
        const event = new KeyboardEvent('keydown', eventInit);
        spyOn(directive, 'validatePercentageOnly').and.callThrough();
        directiveElm.triggerEventHandler('keydown', event);
        expect(directive.validatePercentageOnly).toHaveBeenCalled();
    });

    it('validatePercentageOnly call with keyCode = 8 (Backspace)', () => {
        const eventInit: KeyboardEventInit = {
            keyCode: 8,
            ctrlKey: false,
            key: "Backspace"
        };
        const event = new KeyboardEvent('keydown', eventInit);
        spyOn(directive, 'validatePercentageOnly').and.callThrough();
        directiveElm.triggerEventHandler('keydown', event);
        expect(directive.validatePercentageOnly).toHaveBeenCalled();
    });
});