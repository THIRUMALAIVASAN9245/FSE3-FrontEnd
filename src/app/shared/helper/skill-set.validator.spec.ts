import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SkillSetValidator } from './skill-set.validator';

describe('SkillSetValidator', () => {
    let validator: SkillSetValidator;

    beforeEach(() => {
        validator = new SkillSetValidator();
    });

    it('should return null if the number of skills is greater than or equal to the minimum required', () => {
        // Arrange
        const minRequired = 2;
        const skills = ['Skill 1', 'Skill 2'];
        const formGroup = new FormGroup({
            skills: new FormControl(skills)
        });

        // Act
        const result = SkillSetValidator.minSkillsRequired('skills', minRequired, { requireCheckboxToBeChecked: true })(formGroup);

        // Assert
        expect(result).toBeNull();
    });

    it('should return a validation error if the number of skills is less than the minimum required', () => {
        // Arrange
        const minRequired = 2;
        const skills = ['Skill 1'];
        const formGroup = new FormGroup({
            skills: new FormControl(skills)
        });

        // Act
        const result = SkillSetValidator.minSkillsRequired('skills', minRequired,{ requireCheckboxToBeChecked: true })(formGroup);

        // Assert
        expect(result).toEqual({ requireCheckboxToBeChecked: true });
    });
});
