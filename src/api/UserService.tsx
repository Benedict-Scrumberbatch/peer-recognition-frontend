import MainApiProtected from "./MainAPIProtected";
import { Users } from "../dtos/entity/users.entity";
import { UserStats } from "../dtos/interface/userstats.interface";

export default class UserService extends MainApiProtected {
    public constructor() {
        super();
    }

    public getStats = async (empId: string): Promise<UserStats> => {
        return await this.instance.get('/users/stats/' + empId);
    };
}
