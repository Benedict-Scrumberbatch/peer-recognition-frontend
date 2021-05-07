import MainApi from './MainAPI';
import { Tag } from '../dtos/entity/tag.entity';
import { authDtoFull, authDto } from '../dtos/dto/auth.dto';

let companyId = 1;

export default class AuthLoginService extends MainApi {
    public constructor() {
        super();
    }
    public postLogin = (username: string, password: string): Promise<authDtoFull> => {
        return this.instance.post('/auth/login', {'username': username, 'password': password});
    };
    public postCreateCompany = (name: any, tags: Tag[]) => {
        companyId += 1
        return this.instance.post('/company/create', {'companyId': companyId, 'name': name, 'tags': tags});
    };
    public getRefreshToken = (): Promise<authDto> => {
        const refreshToken = localStorage.getItem('refresh_token');
        return this.instance.post('/auth/refreshtoken', {}, {headers: {Authorization: `Bearer  ${refreshToken}`}});
    };
}
