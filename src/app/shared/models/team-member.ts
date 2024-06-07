import { Role } from "@app/core/models/role";

export interface TeamMember {
    id: number;
    memberName: string;
    numberOfExp: string;
    skillSets: string;
    additionalInfo: string;
    projectStartDate: Date;
    projectEndDate: Date;
    allocationPercentage: number;
    role: Role;
}