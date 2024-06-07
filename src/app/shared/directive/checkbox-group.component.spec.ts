import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxGroupComponent } from './checkbox-group.component';

describe('CheckboxGroupComponent', () => {
    let component: CheckboxGroupComponent;
    let fixture: ComponentFixture<CheckboxGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckboxGroupComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set the model value', () => {
        const value = 'test value';
        component.writeValue(value);
        expect(component.model).toEqual(value);
    });

    it('should return false if the model does not contain a value', () => {
        const value = 'test value';
        expect(component.contains(value)).toBe(false);
    });

    it('should set the model value and call registerOnChange', () => {
        const value = 'test value';
        component.writeValue(value);

        component.registerOnChange(() => {});

        expect(component.model).toEqual(value);
    });

    it('should set the model value and call registerOnTouched', () => {
        const value = 'test value';
        component.writeValue(value);

        const result = component.registerOnTouched(() => {});

        expect(component.model).toEqual(value);
    });

    it('should set the model value and call addOrRemove with remove', () => {
        const value = ['test1', 'test2', 'test3'];
        component.writeValue(value);
        component.registerOnChange(() => {});

        component.addOrRemove('test1');

        expect(component.model).toEqual(value);
    });

    it('should set the model value and call set', () => {
        const value = ['test1', 'test2', 'test3'];
        component.registerOnChange(() => {});
        
        component.set(value);

        expect(component.model).toEqual(value);
    });

    it('should set the model value and call addOrRemove with add', () => {
        const value = ['test1', 'test2', 'test3'];
        const valueResponse = ['test1', 'test2', 'test3', 'test4'];
        component.writeValue(value);
        component.registerOnChange(() => {});

        component.addOrRemove('test4');

        expect(component.model).toEqual(valueResponse);
    });

    it('should set the model value and call addOrRemove with add', () => {
        const valueResponse = ['test1', 'test2', 'test3', 'test4'];
        component.writeValue('test');
        component.registerOnChange(() => {});

        component.addOrRemove(valueResponse);

        expect(component.model.length).toEqual(1);
    });
});
