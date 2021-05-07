import MainApiProtected from "./MainAPIProtected";
import { ReturnRockstarDto} from '../dtos/dto/rockstar-stats.dto';

export default class RockstarService extends MainApiProtected {
    public constructor() {
        super();
    }
    public getRockstar = async ():Promise<ReturnRockstarDto> => {
        return await this.instance.get('/rockstar');
    };
}