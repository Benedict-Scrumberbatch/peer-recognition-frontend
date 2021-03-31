import MainApiProtected from "./MainAPIProtected";

export default class RecognitionService extends MainApiProtected {
    public constructor() {
        super();
    }
    public getFeed = () => {
        return this.instance.get('/recognitions/all');
    };
}