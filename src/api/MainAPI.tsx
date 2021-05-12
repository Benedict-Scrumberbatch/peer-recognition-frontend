import { Users } from '../common/entity/users.entity';
import HttpClient from './HTTPClient';

let API_URL: string;
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
  // production code
} else {
  API_URL = "http://localhost:4200"
}

export default class MainApi extends HttpClient {
  public constructor() {
    super(API_URL);
  }

  public getUsers = () => this.instance.get<Users[]>('/users');
  
  public getUser = (id: string) => this.instance.get<Users>(`/users/${id}`);
}