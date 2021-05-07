import MainApiProtected from "./MainAPIProtected";
import { Users } from "../dtos/entity/users.entity";
import { UserStats } from "../dtos/interface/userstats.interface";

export default class UserService extends MainApiProtected {
    userProfile: Users;
    nextSearchUrl: string;

    public constructor() {
        super();
    }

    public getUserProfile = async (): Promise<Users> => {
        if (!this.userProfile) {
            this.userProfile = await this.instance.get('users/profile');
        }
        return this.userProfile
    };

    public getStats = async (id: string): Promise<UserStats> => {
        return await this.instance.get(encodeURI(`/users/stats/${id}`));
    };

    public searchUsers = async (query: string, page = 1, limit = 10): Promise<Users[]> => {
        let result = await this.instance.get(encodeURI(`/users/search?search=${query}&page=${page}&limit=${limit}`));
        this.nextSearchUrl = result.meta.next;
        return result.items;
    };

    public searchUserNext = async(): Promise<Users[]> => {
        if (this.nextSearchUrl) {
            let result = await this.instance.get(encodeURI(this.nextSearchUrl));
            this.nextSearchUrl = result.meta.next;
            return result.items;
        }
        return [];
    }

    public getUserId = async (id: string): Promise<Users> => {
        return await this.instance.get(`/users/employeeId/${id}`);
    }
}
