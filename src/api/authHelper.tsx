const auth = {
	isAuthenticated() {
		if (typeof window == 'undefined') return false;

		if (localStorage.getItem('jwt'))
			return (localStorage.getItem('jwt'));
		else return false;
	},
	authenticate(jwt: any, cb: any) {
		if (typeof window !== 'undefined')
			localStorage.setItem('jwt', jwt.access_token);
		cb();
	},
	signout(cb: any) {
		if (typeof window !== 'undefined') localStorage.removeItem('jwt');
		cb();
	}
};

export default auth;