import MainApiProtected from "./MainAPIProtected";
import { Users } from "../dtos/entity/users.entity";
import { UserStats } from "../dtos/interface/userstats.interface";
import { UserPagination } from "../dtos/dto/pagination.dto";

export default class UserService extends MainApiProtected {

    public constructor() {
        super();
    }

    public getUserProfile = async (): Promise<Users> => {
        return await this.instance.get('users/profile');
    };

    public getStats = async (): Promise<UserStats> => {
        console.log('stats')
        const userProfile = await this.getUserProfile();
        return await this.instance.get('/users/stats/' + userProfile.employeeId);
    };

    public searchUsers = async (query: string, page = 1, limit = 10): Promise<UserPagination> => {
        return await this.instance.get(encodeURI(`/users/search?search=${query}&page=${page}&limit=${limit}`));
    };

    public searchUserNext = async(url: string): Promise<UserPagination> => {
            return await this.instance.get(encodeURI(url));

    }
}
