import { RecognitionPagination } from "../common/dto/pagination.dto";
import { Recognition } from "../common/entity/recognition.entity";
import { Tag } from "../common/entity/tag.entity";
import { Users } from "../common/entity/users.entity";
import { Comment } from "../common/entity/comment.entity";
import MainApiProtected from "./MainAPIProtected";

export default class RecognitionService extends MainApiProtected {
    public constructor() {
        super();
    }
    public getAll = async (): Promise<Recognition[]> => {
        return await this.instance.get('/recognitions/all');
    };

    public getRec = async (id: string): Promise<Recognition> => {
        return await this.instance.get(`/recognitions/${id}`);
    };

    public getAllTags = async (): Promise<Tag[]> => {
        return await this.instance.get('/tag');
    };

    public createPost = async (targetUser: Users, message: string, tags: Tag[]): Promise<Recognition> => {
        return this.instance.post('/recognitions/create', {
            "empTo": targetUser,
            "msg": message,
            "tags": tags
        });
    }

    public createComment = async (id: number, comment: string): Promise<Comment> => {
        return await this.instance.post(`/recognitions/${id}/comment`, {
            "msg": comment
        });
    }

    public searchRecs = async (query: string, page = 1, limit = 10): Promise<RecognitionPagination> => {
        return await this.instance.get(encodeURI(`/recognitions/search?search=${query}&page=${page}&limit=${limit}`));
    };

    public employeeRecs = async (employeeId: string, page = 1, limit = 10): Promise<RecognitionPagination> => {
        return await this.instance.get(encodeURI(`/recognitions/search?empToFrom_id=${employeeId}&page=${page}&limit=${limit}`));
    };

    public paginatedRecs = async (page = 1, limit = 10): Promise<RecognitionPagination> => {
        return await this.instance.get(encodeURI(`/recognitions/search?page=${page}&limit=${limit}`));
    };

    public searchRecsNext = async(url: string): Promise<RecognitionPagination> => {
            return await this.instance.get(encodeURI(url));
    }
}