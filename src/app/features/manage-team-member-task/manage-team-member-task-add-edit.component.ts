import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ManageTeamMemberService } from '@app/shared/services/manage-team-member.service';
import { AlertService } from '@app/core/services/alert.service';
import { TeamMember } from '@app/shared/models/team-member';
import { DateValidators } from '@app/shared/helper/date.validators';
import { ManageTeamMemberTaskService } from '@app/shared/services/manage-team-member-task.service';

@Component({ templateUrl: 'manage-team-member-task-add-edit.component.html' })
export class ManageTeamMemberTaskAddEditComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    dataList: Array<any> = [];
    teammemberInfo: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private manageTeamMemberTaskService: ManageTeamMemberTaskService,
        private manageTeamMemberService: ManageTeamMemberService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.manageTeamMemberService.getTeamMemberListAll()
            .pipe(first())
            .subscribe(response => {
                this.dataList = response;
            });

        this.id = this.route.snapshot.params['id'];

        this.form = this.formBuilder.group({
            teamMemberName: [null, Validators.required],
            teamMemberId: [null, Validators.required],
            taskName: [null, Validators.required],
            deliverables: [null, Validators.required],
            taskStartDate: [null, Validators.required],
            taskEndDate: [null, Validators.required],
        }, {
            validator: Validators.compose([
                DateValidators.dateLessThan('taskStartDate', 'taskEndDate', { dateLessThan: true })
            ])
        });

        this.title = 'Add Team Member Task';
        if (this.id) {
            // edit mode
            this.title = 'Edit Team Member Task';
            this.loading = true;
            this.manageTeamMemberTaskService.getTeamMemberTaskById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                    this.getTeammemberInfo();
                });
        }
    }

    onChange() {
        this.getTeammemberInfo();
    }

    private getTeammemberInfo() {
        var teamMemberId = this.f.teamMemberId.value;
        this.loading = true;
        this.manageTeamMemberService.getTeamMemberById(+teamMemberId)
            .pipe(first())
            .subscribe((x: TeamMember) => {
                this.teammemberInfo = x;
                this.f.teamMemberName.patchValue(x.memberName);
                this.loading = false;
            });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        if (new Date(this.teammemberInfo.projectEndDate) < new Date(this.form.value.taskEndDate)) {
            this.alertService.error('Task End Date  should be less than Project End Date', { keepAfterRouteChange: false });
            return;
        }

        if (new Date(this.teammemberInfo.projectStartDate) > new Date(this.form.value.taskStartDate)) {
            this.alertService.error('Task Start Date  should be greather than Project Start Date', { keepAfterRouteChange: false });
            return;
        }

        this.submitting = true;
        this.saveTeamMemberTask()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Team Member Task Saved', { keepAfterRouteChange: true, autoClose: true });
                    this.router.navigateByUrl('/manage-team-member-task');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveTeamMemberTask() {
        return this.id
            ? this.manageTeamMemberTaskService.updateTeamMemberTask(this.id!, this.form.value)
            : this.manageTeamMemberTaskService.createTeamMemberTask(this.form.value);
    }
}