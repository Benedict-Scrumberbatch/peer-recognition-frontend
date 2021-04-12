import MainApiProtected from "./MainAPIProtected";
import { Users } from "../dtos/entity/users.entity";
import { UserStats } from "../dtos/interface/userstats.interface";

export default class UserService extends MainApiProtected {
    public constructor() {
        super();
    }

    public getUserProfile = async (): Promise<Users> =>  {
        return await this.instance.get('users/profile');
    };

    public getStats = async (): Promise<UserStats> => {
        const userProfile = await this.getUserProfile();
        return this.instance.get('/users/stats/' + userProfile.employeeId + '/company/' + userProfile.companyId);
    };
}
