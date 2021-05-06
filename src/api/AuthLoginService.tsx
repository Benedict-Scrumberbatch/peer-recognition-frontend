import MainApi from './MainAPI';
import { Tag } from '../dtos/entity/tag.entity';
import { Login } from '../dtos/entity/login.entity';
import { Company } from '../dtos/entity/company.entity';

let companyId = 1;

export default class AuthLoginService extends MainApi {
    public constructor() {
        super();
    }
    public postLogin = (username: string, password: string): Promise<any> => {
        return this.instance.post('/auth/login', {'username': username, 'password': password});
    };
    public postCreateCompany = (name: string, tags: Tag[]): Promise<Company> => {
        companyId += 1
        return this.instance.post('/company/create', {'companyId': companyId, 'name': name, 'tags': tags});
    }
}
