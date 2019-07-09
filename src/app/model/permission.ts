import { PermissionGroup } from './permissionGroup';

export class Permission {
    public id?: number;
    public permissionId?: number;
    public userId?: number;
    public description?: string;
    public groupDto?: PermissionGroup; 

    constructor() {
    }
}