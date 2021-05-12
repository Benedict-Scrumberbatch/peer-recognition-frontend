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

    public async uploadJson(file: any) {
        console.log('uploading');
        let formData = new FormData();
    
        formData.append("file", file);
        return await this.instance.post("/users/uploadJSON", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    }

    public getStats = async (id: string): Promise<UserStats> => {
        return await this.instance.get(encodeURI(`/users/stats/${id}`));
    };

    public searchUsers = async (query: string, page = 1, limit = 10): Promise<UserPagination> => {
        return await this.instance.get(encodeURI(`/users/search?search=${query}&page=${page}&limit=${limit}`));
    };

    public searchUserNext = async(url: string): Promise<UserPagination> => {
            return await this.instance.get(encodeURI(url));

    }

    public getUserId = async (id: string): Promise<Users> => {
        return await this.instance.get(`/users/employeeId/${id}`);
    }

    public getEmail = async(): Promise<{ email: string }> => {
        return await this.instance.get('/users/email');
    }

    public deleteUser = async (id: number) => {
        return await this.instance.delete(`/users/${id}`);
    }
}
