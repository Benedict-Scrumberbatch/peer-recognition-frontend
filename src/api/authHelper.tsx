const auth = {
	isAuthenticated() {
		if (typeof window == 'undefined') return false;

		if (sessionStorage.getItem('jwt'))
			return JSON.parse(sessionStorage.getItem('jwt') || '{}');
		else return false;
	},
	authenticate(jwt: any, cb: any) {
		if (typeof window !== 'undefined')
			sessionStorage.setItem('jwt', JSON.stringify(jwt));
		cb();
	},
	signout(cb: any) {
		if (typeof window !== 'undefined') sessionStorage.removeItem('jwt');
		cb();
	}
};

export default auth;