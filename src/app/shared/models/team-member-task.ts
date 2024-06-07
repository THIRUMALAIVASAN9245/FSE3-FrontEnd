export interface TeamMemberTask {
    id: number;
    teamMemberName: string;
    teamMemberId: number;
    taskName: string;
    deliverables: string;
    taskStartDate: Date;
    taskEndDate: Date;
}