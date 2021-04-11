import MainApiProtected from "./MainAPIProtected";

import { Users } from "../dto/entity/users.entity";
import {Login} from "../dto/entity/login.entity";

export default class SettingsService extends MainApiProtected {
    public constructor() {
        super();
    }

    public getUserProfile = async (): Promise<Users> =>  {
        return await this.instance.get('users/profile');
    };

    public createUser = (body: Users & Login & {managerId: number} & {companyName: string}) => this.instance.post('/users/create', body); 


    public deleteUser = async () => { 
        const userProfile = await this.getUserProfile();
        this.instance.get('/users/' + userProfile.employeeId + '/company/' + userProfile.companyId);
    }


    
}