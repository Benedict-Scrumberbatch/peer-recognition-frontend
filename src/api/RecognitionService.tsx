import MainApiProtected from "./MainAPIProtected";

export default class RecognitionService extends MainApiProtected {
    public constructor() {
        super();
    }
    public getFeed = () => this.instance.get('/feed');
}