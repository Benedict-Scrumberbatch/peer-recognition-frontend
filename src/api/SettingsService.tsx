import { fileURLToPath } from "url";
import { EditLoginDto } from "../dtos/dto/edit-login.dto";
import MainApi from "./MainAPI";
import MainApiProtected from "./MainAPIProtected";

export default class SettingsService extends MainApi {
    public constructor() {
        super();
    }

    public changeLogin = async (details: EditLoginDto) => {
        return await this.instance.patch('/auth', details);
    }
}