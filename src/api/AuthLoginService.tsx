import MainApi from './MainAPI';
import { Tag } from '../dtos/entity/tag.entity';

let companyId = 1;

export default class AuthLoginService extends MainApi {
    public constructor() {
        super();
    }
    public postLogin = (username: any, password: any) => {
        return this.instance.post('/auth/login', {'username': username, 'password': password});
    };
    public postCreateCompany = (name: any, tags: Tag[]) => {
        companyId += 1
        return this.instance.post('/company/create', {'companyId': companyId, 'name': name, 'tags': tags});
    }
}
