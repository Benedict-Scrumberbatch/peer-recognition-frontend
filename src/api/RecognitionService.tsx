import MainApiProtected from "./MainAPIProtected";

export default class RecognitionService extends MainApiProtected {
    public constructor() {
        super();
    }
    public getFeed = () => {
        console.log("Got feed");
        return this.instance.get('/recognitions/all');
    };
}