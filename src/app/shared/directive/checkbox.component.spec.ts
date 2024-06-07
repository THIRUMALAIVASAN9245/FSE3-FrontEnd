import { CheckboxComponent } from './checkbox.component';
import { CheckboxGroupComponent } from './checkbox-group.component';

describe('CheckboxComponent', () => {
    let component: CheckboxComponent;
    let checkboxGroup: CheckboxGroupComponent;

    beforeEach(() => {
        checkboxGroup = new CheckboxGroupComponent();
        component = new CheckboxComponent(checkboxGroup);
    });

    it('should toggle check', () => {
        const value = 'test';
        component.value = value;
        spyOn(checkboxGroup, 'addOrRemove');
        
        component.toggleCheck();

        expect(checkboxGroup.addOrRemove).toHaveBeenCalledWith(value);
    });

    it('should return true when checked', () => {
        const value = 'test';
        component.value = value;
        spyOn(checkboxGroup, 'contains').and.returnValue(true);
        
        const result = component.isChecked();

        expect(result).toBe(true);
        expect(checkboxGroup.contains).toHaveBeenCalledWith(value);
    });

    it('should return false when not checked', () => {
        const value = 'test';
        component.value = value;
        spyOn(checkboxGroup, 'contains').and.returnValue(false);
        
        const result = component.isChecked();

        expect(result).toBe(false);
        expect(checkboxGroup.contains).toHaveBeenCalledWith(value);
    });
});
