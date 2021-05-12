import MainApi from './MainAPI';
import { Tag } from '../common/entity/tag.entity';
import { authDtoFull, authDto } from '../common/dto/auth.dto';
import { Login } from '../common/entity/login.entity';
import { Company } from '../common/entity/company.entity';


export default class AuthLoginService extends MainApi {
    public constructor() {
        super();
    }
    public postLogin = (username: string, password: string): Promise<authDtoFull> => {
        return this.instance.post('/auth/login', {'username': username, 'password': password});
    };
    public postCreateCompany = (name: string, tags: Tag[]): Promise<Company> => {
        return this.instance.post('/company/create', { 'name': name, 'tags': tags});
    };
    public getRefreshToken = (): Promise<authDto> => {
        const refreshToken = localStorage.getItem('refresh_token');
        return this.instance.post('/auth/refreshtoken', {}, {headers: {Authorization: `Bearer  ${refreshToken}`}});
    };
}
