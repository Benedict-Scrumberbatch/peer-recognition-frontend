import { authDtoFull } from '../dtos/dto/auth.dto';

const auth = {
	isAuthenticated() {
		if (typeof window == 'undefined') return false;

		const expiration = localStorage.getItem('refresh_token_expire');
		
		if (expiration && new Date(expiration) >= new Date()) {
			return true
		}
		else return false;
	},
	authenticate(tokenObject: authDtoFull, cb: any) {
		if (typeof window !== 'undefined') {
			localStorage.setItem('access_token', tokenObject.access_token);
			localStorage.setItem('access_token_expire', tokenObject.accessTokenExpire);
			localStorage.setItem('refresh_token', tokenObject.refresh_token);
			localStorage.setItem('refresh_token_expire', tokenObject.refreshTokenExpire);
		}
		cb();
	},
	signout(cb: any) {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('access_token');
			localStorage.removeItem('access_token_expire');
			localStorage.removeItem('refresh_token');
			localStorage.removeItem('refresh_token_expire');
		}
		cb();
	}
};

export default auth;