import { AbstractControl, ValidatorFn } from '@angular/forms';

export class SkillSetValidator {
    static minSkillsRequired(dateField1: string, minRequired: number = 2, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl | any): { [key: string]: boolean } | null => {
                const value = c.get(dateField1).value;

            if (value && value.length < minRequired) {
                return validatorField;
            }
        
            return null;
        };
    }
}
