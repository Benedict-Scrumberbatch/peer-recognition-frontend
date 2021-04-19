import MainApi from './MainAPI';
import { Tag } from '../dtos/entity/tag.entity';

export default class AuthLoginService extends MainApi {
    public constructor() {
        super();
    }
    public postLogin = (username: any, password: any) => {
        return this.instance.post('/auth/login', {'username': username, 'password': password});
    };
    public postCreateCompany = (name: any, tags: Tag[]) => {
        return this.instance.post('/company/create', {'name': name, 'tags': tags});
    }
}
