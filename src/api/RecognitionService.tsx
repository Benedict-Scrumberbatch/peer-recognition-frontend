import { Recognition } from "../dtos/entity/recognition.entity";
import { Tag } from "../dtos/entity/tag.entity";
import { Users } from "../dtos/entity/users.entity";
import MainApiProtected from "./MainAPIProtected";

export default class RecognitionService extends MainApiProtected {
    public constructor() {
        super();
    }
    public getFeed = async (): Promise<Recognition[]> => {
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
}