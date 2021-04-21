import HttpClient from './HTTPClient';

let API_URL: any;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  API_URL = "http://localhost:4200"
} else {
  API_URL = process.env.REACT_APP_API_URL;
  // production code
}

export default class MainApi extends HttpClient {
  public constructor() {
    super(API_URL);
  }

  public getUsers = () => this.instance.get<any[]>('/users');
  
  public getUser = (id: string) => this.instance.get<any>(`/users/${id}`);
}