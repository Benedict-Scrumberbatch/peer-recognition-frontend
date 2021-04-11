import MainApiProtected from "./MainAPIProtected";

export default class AuthLoginService extends MainApiProtected {
    public constructor() {
        super();
    }
    public postLogin = (username: any, password: any) => {
        return this.instance.post('/auth/login', {'username': username, 'password': password});
    };
}
