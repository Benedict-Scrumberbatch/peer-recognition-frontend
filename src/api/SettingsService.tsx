import MainApiProtected from "./MainAPIProtected";

export default class SettingsService extends MainApiProtected {
    public constructor() {
        super();
    }
    public getSettings = () => this.instance.get('/settings/all');
}