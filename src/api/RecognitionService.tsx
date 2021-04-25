import { Recognition } from "../dtos/entity/recognition.entity";
import MainApiProtected from "./MainAPIProtected";

export default class RecognitionService extends MainApiProtected {
    public constructor() {
        super();
    }
    public getFeed = async (): Promise<Recognition[]> => {
        return await this.instance.get('/recognitions/all');
    };
}