import MainApiProtected from "./MainAPIProtected";
import { Users } from "../dtos/entity/users.entity";
import { UserStats } from "../dtos/interface/userstats.interface";

export default class UserService extends MainApiProtected {
    userProfile: Users;

    public constructor() {
        super();
    }

    public getUserProfile = async (): Promise<Users> =>  {
        if (!this.userProfile) {
            this.userProfile = await this.instance.get('users/profile');
        }
        return this.userProfile
    };

    public getStats = async (): Promise<UserStats> => {
        console.log('stats')
        const userProfile = await this.getUserProfile();
        return await this.instance.get('/users/stats/' + this.userProfile.employeeId);
    };
}
