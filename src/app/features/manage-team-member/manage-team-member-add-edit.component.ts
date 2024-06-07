import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ManageTeamMemberService } from '@app/shared/services/manage-team-member.service';
import { AlertService } from '@app/core/services/alert.service';
import { DateValidators } from '@app/shared/helper/date.validators';
import { SkillSetValidator } from '@app/shared/helper/skill-set.validator';

@Component({ templateUrl: 'manage-team-member-add-edit.component.html' })
export class ManageTeamMemberAddEditComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    skillList = ['JavaScript', 'HTML', 'C#', 'SQL', 'DOTNET', 'ANGULAR', 'REACT', 'MongoDB', 'MySQL', 'Python', 'Power BI'];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private manageTeamMemberService: ManageTeamMemberService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        // // this.id = +this.route.snapshot.paramMap.get('id');

        this.form = this.formBuilder.group({
            memberName: [null, Validators.required],
            numberOfExp: [null, [Validators.required, Validators.max(65), Validators.min(4)]],
            additionalInfo: [null, Validators.required],
            projectStartDate: [null, [Validators.required]],
            projectEndDate: [null, Validators.required],
            allocationPercentage: [null, Validators.required],
            role: [null, Validators.required],
            skillSets: [null, Validators.required]
        }, {
            validator: Validators.compose([
                DateValidators.dateLessThan('projectStartDate', 'projectEndDate', { dateLessThan: true }),
                SkillSetValidator.minSkillsRequired('skillSets', 3, { requireCheckboxToBeChecked: true }),
            ])
        });

        this.projectEndDate.valueChanges.subscribe(value => {
            const date1 = new Date();
            const date2 = new Date(value);;
            if (date1 !== null && date2 !== null && date1 < date2) {
                this.allocationPercentage.patchValue(100);
            }

            if (date1 !== null && date2 !== null && date1 > date2) {
                this.allocationPercentage.patchValue(0);
            }

            this.form.updateValueAndValidity();
        });

        this.title = 'Add Team Member';
        if (this.id) {
            // edit mode
            this.title = 'Edit Team Member';
            this.loading = true;
            this.manageTeamMemberService.getTeamMemberById(this.id)
                .pipe(first())
                .subscribe(x => {
                                this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    get projectEndDate() {
        return this.form.get('projectEndDate') as FormControl;
    }

    get allocationPercentage() {
        return this.form.get('allocationPercentage') as FormControl;
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        if (new Date() > new Date(this.form.value.projectEndDate) && this.form.value.allocationPercentage > 0) {
            this.alertService.error('Update alacation percentage as ZERO', { keepAfterRouteChange: false });
            return;
        }

        this.submitting = true;
        this.saveTeamMember()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Team Member saved', { keepAfterRouteChange: true, autoClose: true });
                    this.router.navigateByUrl('/manage-team-member');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveTeamMember() {
        return this.id
            ? this.manageTeamMemberService.updateTeamMember(this.id!, this.form.value)
            : this.manageTeamMemberService.createTeamMember(this.form.value);
    }
}


