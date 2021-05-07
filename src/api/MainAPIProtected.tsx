// axios + TypeScript code from article: https://levelup.gitconnected.com/enhance-your-http-request-with-axios-and-typescript-f52a6c6c2c8e
import HttpClient from './HTTPClient';
import { AxiosRequestConfig } from 'axios';
import AuthLoginService from './AuthLoginService';
import auth from './authHelper';


let API_URL: string;
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
  // production code
} else {
  API_URL = "http://localhost:4200"
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
    const access_token = localStorage.getItem('access_token');
    const accessTokenExpiration = localStorage.getItem('access_token_expire');
    const refreshTokenExpiration = localStorage.getItem('refresh_token_expire');
    if (accessTokenExpiration && new Date() >= new Date(accessTokenExpiration)) {
      // if (refreshTokenExpiration && new Date() < new Date(refreshTokenExpiration)) {
        const loginAPI = new AuthLoginService();
        return loginAPI.getRefreshToken()
        .then((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('access_token_expire', response.accessTokenExpire);
          config.headers['Authorization'] = `Bearer ${response.access_token}`;
          return config;
        });
      // } else {
      //   // auth.signout(() => history.push("/"))
      // }
      
    }
    else {
      config.headers['Authorization'] = `Bearer ${access_token}`;
      return config;
    }
  };
}