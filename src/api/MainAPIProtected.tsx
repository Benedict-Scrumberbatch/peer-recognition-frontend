// axios + TypeScript code from article: https://levelup.gitconnected.com/enhance-your-http-request-with-axios-and-typescript-f52a6c6c2c8e
import HttpClient from './HTTPClient';
import { AxiosRequestConfig } from 'axios';
import { User } from '../types/user';


let API_URL: any;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  API_URL = "http://localhost:4200"
} else {
  API_URL = process.env.REACT_APP_API_URL;
  // production code
}

export default class MainApiProtected extends HttpClient {
  public constructor() {
    super(API_URL);

    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    const access_token = localStorage.getItem('access_token')
    config.headers['Authorization'] = `Bearer ${access_token}`;
    // request.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwibmFtZSI6IlNhbXBsZSIsImlhdCI6MTUxNjIzODIzfQ.ZEBwz4pWYGqgFJc6DIi7HdTN0z5Pfs4Lcv4ZNwMr1rs';

    return config;
  };

  public createUser = (body: User) => this.instance.post('/users', body);
}