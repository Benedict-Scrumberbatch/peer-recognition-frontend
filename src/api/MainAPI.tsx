
import HttpClient from './HTTPClient';
import { User } from '../types/user';

class MainApi extends HttpClient {
  public constructor() {
    super('https://api.awesome-site.com');
  }

  public getUsers = () => this.instance.get<User[]>('/users');
  
  public getUser = (id: string) => this.instance.get<User>(`/users/${id}`);
}