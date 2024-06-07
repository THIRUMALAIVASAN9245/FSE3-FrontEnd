import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DateValidators } from './date.validators';

describe('DateValidators', () => {
    let formGroup: FormGroup;

    beforeEach(() => {
        formGroup = new FormGroup({
            dateField1: new FormControl(),
            dateField2: new FormControl()
        });
    });

    it('should return null when date1 is less than date2', () => {
        // Arrange
        const dateField1 = 'dateField1';
        const dateField2 = 'dateField2';
        const validatorField = { invalidDate: true };
        const validatorFn = DateValidators.dateLessThan(dateField1, dateField2, validatorField);
        formGroup.get(dateField1)?.setValue('2022-01-01');
        formGroup.get(dateField2)?.setValue('2022-01-02');

        // Act
        const result = validatorFn(formGroup);

        // Assert
        expect(result).toBeNull();
    });

    it('should return validatorField when date1 is greater than date2', () => {
        // Arrange
        const dateField1 = 'dateField1';
        const dateField2 = 'dateField2';
        const validatorField = { invalidDate: true };
        const validatorFn = DateValidators.dateLessThan(dateField1, dateField2, validatorField);
        formGroup.get(dateField1)?.setValue('2022-01-02');
        formGroup.get(dateField2)?.setValue('2022-01-01');

        // Act
        const result = validatorFn(formGroup);

        // Assert
        expect(result).toEqual(validatorField);
    });

    it('should return null when date1 and date2 are empty', () => {
        // Arrange
        const dateField1 = 'dateField1';
        const dateField2 = 'dateField2';
        const validatorField = { invalidDate: true };
        const validatorFn = DateValidators.dateLessThan(dateField1, dateField2, validatorField);
        formGroup.get(dateField1)?.setValue('');
        formGroup.get(dateField2)?.setValue('');

        // Act
        const result = validatorFn(formGroup);

        // Assert
        expect(result).toBeNull();
    });

    it('should return null when date1 and date2 are null', () => {
        // Arrange
        const dateField1 = 'dateField1';
        const dateField2 = 'dateField2';
        const validatorField = { invalidDate: true };
        const validatorFn = DateValidators.dateLessThan(dateField1, dateField2, validatorField);
        formGroup.get(dateField1)?.setValue(null);
        formGroup.get(dateField2)?.setValue(null);

        // Act
        const result = validatorFn(formGroup);

        // Assert
        expect(result).toBeNull();
    });
});
